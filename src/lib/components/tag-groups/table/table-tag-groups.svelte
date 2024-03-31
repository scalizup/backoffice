<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { CreateSchema, DeleteSchema, UpdateSchema } from '../schemas';
	import TableCellTagGroupEntities from './table-cell-tag-group-entities.svelte';
	import TableCellTagGroupActions from './table-cell-tag-group-actions.svelte';
	import type { GetAllTagGroupsPaginated } from '$lib/data-contracts';

	export let data: {
		response: GetAllTagGroupsPaginated;
		forms: {
			create: SuperValidated<Infer<CreateSchema>>;
			update: SuperValidated<Infer<UpdateSchema>>;
			delete: SuperValidated<Infer<DeleteSchema>>;
		};
		tenantId: number;
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
			{#each data.response.items as tagGroup}
				<Table.Row>
					<Table.Cell class="font-medium">{tagGroup.id}</Table.Cell>
					<Table.Cell>{tagGroup.name}</Table.Cell>
					<Table.Cell>
						<TableCellTagGroupEntities
							data={{
								tenantId: data.tenantId,
								tagGroupId: tagGroup.id
							}}
						/>
					</Table.Cell>
					<Table.Cell class="text-right">
						<TableCellTagGroupActions {tagGroup} forms={data.forms} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
