<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createSchemaStep1, createSchemaStep2, type CreateSchemaStep2 } from '../schemas';
	import { Textarea } from '$lib/components/ui/textarea';

	let open = false;

	export let form: SuperValidated<Infer<CreateSchemaStep2>>;

	const steps = [zod(createSchemaStep1), zod(createSchemaStep2)];
	let step = 1;

	const _form = superForm(form, {
		dataType: 'json',
		async onSubmit({ cancel }) {
			if (step == steps.length) return;
			else cancel();

			const result = await _form.validateForm({ update: true });

			console.log(result.data);

			if (result.valid) step = step + 1;
		},

		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});

	const { form: formData, enhance } = _form;

	$: {
		_form.options.validators = steps[step - 1];
	}
</script>

<Button
	on:click={() => {
		open = true;
		step = 1;
		_form.reset();
	}}>Create a Product</Button
>
<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create a new Product</Dialog.Title>
			<Dialog.Description>
				Please enter the required data for the product creation.
			</Dialog.Description>
			<form method="POST" action="?/create" use:enhance>
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
								on:change={(e) => {
									if (e.currentTarget.value.length === 0 || e.currentTarget.value === '') {
										$formData.price = null;
									}
								}}
								step=".01"
								type="number"
								placeholder="19.99..."
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Button>Configure Tags</Form.Button>
				{:else}
					<Form.Field form={_form} name="tags">
						<Form.Control let:attrs>
							<Form.Label>Tags</Form.Label>
							<Input {...attrs} bind:value={$formData.tags} placeholder="Ingredients, Spicy" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Button>Create Product</Form.Button>
				{/if}
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
