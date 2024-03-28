<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import TableCellTenantName from '$lib/components/tenants/table/table-cell-tenant-name.svelte';
	import TableCellTenantActions from '$lib/components/tenants/table/table-cell-tenant-actions.svelte';
	import TableCellTenantEntities from '$lib/components/tenants/table/table-cell-tenant-entities.svelte';
	import type { GetAllTenantsTenantDtoDomainVersion1000CultureNeutralPublicKeyTokenNull } from '$lib/myApi';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { DeleteSchema, UpdateSchema } from '../schemas';

	export let data: {
		tenants: GetAllTenantsTenantDtoDomainVersion1000CultureNeutralPublicKeyTokenNull;
		forms: {
			update: SuperValidated<Infer<UpdateSchema>>;
			delete: SuperValidated<Infer<DeleteSchema>>;
		};
	};
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Id</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Related Entities</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.tenants.items as tenant}
				<Table.Row>
					<Table.Cell class="font-medium">{tenant.id}</Table.Cell>
					<Table.Cell>
						<TableCellTenantName name={tenant.name} isActive={tenant.isActive} />
					</Table.Cell>
					<Table.Cell>
						<TableCellTenantEntities tenantId={tenant.id} />
					</Table.Cell>
					<Table.Cell class="text-right">
						<TableCellTenantActions {tenant} forms={data.forms} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
