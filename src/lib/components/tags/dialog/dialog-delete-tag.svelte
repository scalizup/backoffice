<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { deleteSchema, type DeleteSchema } from '../schemas';
	import type { GetAllTagsTagDto } from '$lib/myApi';

	export let open: boolean;
	export let tag: GetAllTagsTagDto;
	export let form: SuperValidated<Infer<DeleteSchema>>;

	const _form = superForm(form, {
		id: tag.id.toString() + '-delete',
		validators: zodClient(deleteSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.error(`Tag group ${tag.name} (${tag.id}) has been deleted.`);
				open = false;
			}
		}
	});

	const { form: formData, enhance } = _form;

	$: open &&
		formData.set({
			id: tag.id
		});
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>
				Are you sure you want to delete the tag {tag.name}?
			</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. Deleting this tag will also delete all the products related.
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
				<Form.Button variant="destructive">Delete</Form.Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
