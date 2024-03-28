<script lang="ts">
	import TablePagination from '$lib/components/shared/table-pagination.svelte';
	import DialogCreateTagGroup from '$lib/components/tag-groups/dialog/dialog-create-tag-group.svelte';
	import TableTagGroups from '$lib/components/tag-groups/table/table-tag-groups.svelte';

	export let data;
</script>

<div class="mb-3 flex justify-between">
	<div>
		<span class="font-bold">Tag Groups Management</span>
	</div>
	<DialogCreateTagGroup form={data.forms.create} />
</div>

{#if data.response.items.length === 0}
	<div class="flex justify-center font-semibold">No tag groups created yet!</div>
{:else}
	<TableTagGroups {data} />
	<TablePagination data={data.response} />
{/if}
