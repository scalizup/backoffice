<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { goto } from '$app/navigation';

	export let data: {
		items: any[];
		totalItems: number;
		pageSize: number;
		currentPage: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	};
</script>

<Pagination.Root class="py-4" count={data.totalItems} perPage={data.pageSize} let:pages>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton
				disabled={!data.hasPreviousPage}
				on:click={() => goto(`?page=${data.currentPage - 1}`)}
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
						isActive={page.value == data.currentPage}
						on:click={() => goto(`?page=${page.value}`)}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton
				disabled={!data.hasNextPage}
				on:click={() => goto(`?page=${data.currentPage + 1}`)}
			/>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
