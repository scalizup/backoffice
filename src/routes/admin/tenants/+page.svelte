<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { goto } from '$app/navigation';
	import CreateTenant from '$lib/components/tenants/dialogs/dialog-create-tenant.svelte';
	import TableTenants from '$lib/components/tenants/table/table-tenants.svelte';

	export let data;
</script>

<div class="mb-3 flex justify-end">
	<CreateTenant data={data.forms.create} />
</div>

{#if data.tenants.data.length === 0}
	<p>No tenants found.</p>
{:else}
	<TableTenants {data} />

	<Pagination.Root class="py-4" count={data.tenants.totalEntities} perPage={5} let:pages>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton
					disabled={!data.tenants.hasPreviousPage}
					on:click={() => goto(`?page=${data.tenants.currentPage - 1}`)}
				/>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link
							{page}
							isActive={page.value == data.tenants.currentPage}
							on:click={() => goto(`?page=${page.value}`)}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton
					disabled={!data.tenants.hasNextPage}
					on:click={() => goto(`?page=${data.tenants.currentPage + 1}`)}
				/>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
{/if}
