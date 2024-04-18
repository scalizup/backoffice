<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import type { ProductResponse } from '$lib/api/contracts/products/api';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { Textarea } from '$lib/components/ui/textarea';
	import { updateSchema } from '../schemas';
	import { Button } from '$lib/components/ui/button';
	import { Pencil } from 'lucide-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let open = false;
	export let product: ProductResponse;
	export let form: SuperValidated<Infer<typeof updateSchema>>;

	const _form = superForm(form, {
		dataType: 'json',
		id: product.id.toString() + '-delete',
		validators: zodClient(updateSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.warning(`Product ${product.name} (${product.id}) has been updated.`);
				open = false;
			}
		}
	});

	const { form: formData, enhance } = _form;
</script>

<Button
	variant="outline"
	size="sm"
	class="w-full"
	on:click={() => {
		_form.reset();
		$formData = {
			...product
		};
		open = true;
	}}
>
	<Pencil class="h-4 w-4" />
</Button>
<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update product {$formData.id}</Dialog.Title>
			<Dialog.Description>Update the product.</Dialog.Description>
			<form method="POST" action="?/update" use:enhance>
				<input type="hidden" name="id" bind:value={$formData.id} />

				<Form.Field form={_form} name="name">
					<Form.Control let:attrs>
						<Form.Label>Product Name</Form.Label>
						<Input {...attrs} bind:value={$formData.name} />
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
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- <Form.Field form={_form} name="image">
					<Form.Control let:attrs>
						<Form.Label>
							Images
							<span class="italic">(optional)</span>
						</Form.Label>
						<input type="file" name="image" accept="image/png, image/jpeg" bind:files={$file} />
						{#if $errors.image}<span>{JSON.stringify($errors.image)}</span>{/if}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field> -->

				<Form.Button>Update Product</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
