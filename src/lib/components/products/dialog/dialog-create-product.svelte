<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated, fileProxy } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createSchemaStep1, createSchemaStep2, type CreateSchemaStep2 } from '../schemas';
	import { Textarea } from '$lib/components/ui/textarea';
	import DialogCreateProductStep_2 from './dialog-create-product-step-2.svelte';
	import type { TagGroup } from '$lib/api/contracts/tag_groups/api';

	let open = false;

	export let tagCategoriesWithTags: TagGroup[];
	export let form: SuperValidated<Infer<CreateSchemaStep2>>;

	const steps = [zod(createSchemaStep1), zod(createSchemaStep2)];
	let step = 1;

	const _form = superForm(form, {
		dataType: 'json',
		async onSubmit({ cancel }) {
			if (step == steps.length) return;
			else cancel();

			const result = await _form.validateForm({ update: true });

			if (step == 1 && result.valid) {
				step = step + 1;
			}
		},

		async onUpdated({ form }) {
			if (form.valid) {
				step = 1;

				open = false;
			}
		}
	});

	const { form: formData, enhance, errors } = _form;
	const file = fileProxy(formData, 'image');

	$: {
		_form.options.validators = steps[step - 1];
	}
</script>

<Button
	on:click={() => {
		_form.reset();
		open = true;
	}}>Create a Product</Button
>
<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if step == 1}
					Create a Product
				{:else}
					Configure Tags
				{/if}
			</Dialog.Title>
			<Dialog.Description>
				{#if step == 1}
					Please fill in the following fields to create a new product.
				{:else}
					Please select the tags that will be associated with the product.
				{/if}
			</Dialog.Description>
			<form method="POST" action="?/create" use:enhance enctype="multipart/form-data">
				{#if step == 1}
					<Form.Field form={_form} name="name">
						<Form.Control let:attrs>
							<Form.Label>Product Name</Form.Label>
							<Input {...attrs} bind:value={$formData.name} placeholder="fish and chips..." />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={_form} name="description">
						<Form.Control let:attrs>
							<Form.Label>
								Description
								<span class="italic">(optional)</span>
							</Form.Label>
							<Textarea
								{...attrs}
								bind:value={$formData.description}
								placeholder="a awesome roasted fish..."
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={_form} name="price">
						<Form.Control let:attrs>
							<Form.Label>
								Price
								<span class="italic">(optional)</span>
							</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.price}
								step=".01"
								placeholder="0.00"
								type="number"
								on:change={() => $formData.price?.toFixed(2)}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field form={_form} name="image">
						<Form.Control let:attrs>
							<Form.Label>
								Images
								<span class="italic">(optional)</span>
							</Form.Label>
							<input type="file" name="image" accept="image/png, image/jpeg" bind:files={$file} />
							{#if $errors.image}<span>{JSON.stringify($errors.image)}</span>{/if}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button>Configure Tags</Form.Button>
				{:else}
					<DialogCreateProductStep_2 {tagCategoriesWithTags} form={_form} />
				{/if}
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
