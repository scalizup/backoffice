<script lang="ts">
	import TablePagination from '$lib/components/shared/table-pagination.svelte';
	import TableTagGroups from '$lib/components/tag-groups/table/table-tag-groups.svelte';
	import DialogCreateTag from '$lib/components/tags/dialog/dialog-create-tag.svelte';

	export let data;
</script>

<div class="mb-3 flex justify-between">
	<div>
		<span class="font-bold">Tag Management</span>
	</div>
	<DialogCreateTag form={data.forms.create} />
</div>

{#if data.response.items.length === 0}
	<div class="flex justify-center font-semibold">No tag groups created yet!</div>
{:else}
	<TableTagGroups {data} />
	<TablePagination data={data.response} />
{/if}
