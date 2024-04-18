<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { deleteSchema } from '../schemas';
	import type { ProductResponse } from '$lib/api/contracts/products/api';
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';

	let open = false;
	export let product: ProductResponse;
	export let form: SuperValidated<Infer<typeof deleteSchema>>;

	const _form = superForm(form, {
		id: product.id.toString() + '-delete',
		validators: zodClient(deleteSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.error(`Product ${product.name} (${product.id}) has been deleted.`);
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
		open = true;

		formData.set({
			id: product.id
		});
	}}
>
	<Trash2 class="h-4 w-4" />
</Button>
<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>
				Are you sure you want to delete the product {product.name}?
			</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. Deleting the product will result it in being remove from the
				menu.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form method="POST" action="?/delete" use:enhance>
				<Form.Field form={_form} name="id">
					<Form.Control let:attrs>
						<Input type="hidden" {...attrs} bind:value={$formData.id} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Form.Button variant="destructive" type="submit">Delete</Form.Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
