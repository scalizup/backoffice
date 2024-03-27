<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { updateSchema, type UpdateSchema } from '../schemas';
	import type { GetAllTenantsTenantDto } from '$lib/myApi';

	export let open: boolean;
	export let tenant: GetAllTenantsTenantDto;
	export let form: SuperValidated<Infer<UpdateSchema>>;

	const _form = superForm(form, {
		validators: zodClient(updateSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.warning(`Tenant ${$formData.id} has been updated.`);
				open = false;
			}
		}
	});

	const { form: formData, enhance } = _form;

	$: open &&
		formData.set({
			id: tenant.id,
			name: tenant.name,
			isActive: tenant.isActive
		});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update tenant {$formData.id}</Dialog.Title>
			<Dialog.Description>Update the business name and its status.</Dialog.Description>
			<form method="POST" action="?/update" use:enhance>
				<input type="hidden" name="id" bind:value={$formData.id} />

				<Form.Field form={_form} name="name">
					<Form.Control let:attrs>
						<Form.Label>Business Name</Form.Label>
						<Input {...attrs} bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={_form} name="isActive">
					<Form.Control let:attrs>
						<div class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="flex flex-col">
								<Form.Label>Is Enabled</Form.Label>
								<Form.Description class="mt-2">
									Activate this business to enable it to engage with the public audience.
									<span class="block text-xs">
										Activation incurs a fee and will be billed to the business owner.
									</span>
								</Form.Description>
							</div>
							<Switch includeInput {...attrs} bind:checked={$formData.isActive} />
						</div>
					</Form.Control>
				</Form.Field>

				<Form.Button>Update Business</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
