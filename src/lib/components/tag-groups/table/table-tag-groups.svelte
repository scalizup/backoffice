<!-- <script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import TableCellTenantName from '$lib/components/tenants/table/table-cell-tenant-name.svelte';
	import type { GetAllTenantsTenantDtoDomainVersion1000CultureNeutralPublicKeyTokenNull } from '$lib/myApi';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { DeleteSchema, UpdateSchema } from '../schemas';
	import TableCellTagGroupEntities from './table-cell-tag-group-entities.svelte';

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
			{#each data.tenants.data as tenant}
				<Table.Row>
					<Table.Cell class="font-medium">{tenant.id}</Table.Cell>
					<Table.Cell>
						<TableCellTenantName name={tenant.name} isActive={tenant.isActive} />
					</Table.Cell>
					<Table.Cell>
						<TableCellTagGroupEntities tenantId={tenant.id} />
					</Table.Cell>
					<Table.Cell class="text-right">
						<TableCellTagGroupEntities {tenant} forms={data.forms} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div> -->
