<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { CreateSchema, DeleteSchema, UpdateSchema } from '../schemas';
	import TableCellTagActions from './table-cell-tag-actions.svelte';
	import type { GetAllTagsPaginated } from '$lib/data-contracts';

	export let data: {
		response: GetAllTagsPaginated;
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
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.response.items as tag}
				<Table.Row>
					<Table.Cell class="font-medium">{tag.id}</Table.Cell>
					<Table.Cell>{tag.name}</Table.Cell>
					<Table.Cell class="text-right">
						<TableCellTagActions {tag} forms={data.forms} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
