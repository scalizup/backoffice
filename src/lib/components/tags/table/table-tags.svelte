<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { GetAllTagsTagDtoDomainVersion1000CultureNeutralPublicKeyTokenNull } from '$lib/myApi';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { CreateSchema, DeleteSchema, UpdateSchema } from '../schemas';
	import TableCellTagEntities from './table-cell-tag-entities.svelte';
	import TableCellTagActions from './table-cell-tag-actions.svelte';

	export let data: {
		response: GetAllTagsTagDtoDomainVersion1000CultureNeutralPublicKeyTokenNull;
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
			{#each data.response.items as tag}
				<Table.Row>
					<Table.Cell class="font-medium">{tag.id}</Table.Cell>
					<Table.Cell>{tag.name}</Table.Cell>
					<Table.Cell>
						<TableCellTagEntities
							data={{
								tenantId: data.tenantId,
								tagId: tag.id
							}}
						/>
					</Table.Cell>
					<Table.Cell class="text-right">
						<TableCellTagActions {tag} forms={data.forms} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
