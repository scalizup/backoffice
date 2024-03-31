<script lang="ts">
	import TablePagination from '$lib/components/shared/table-pagination.svelte';
	import DialogCreateTag from '$lib/components/tags/dialog/dialog-create-tag.svelte';
	import TableTags from '$lib/components/tags/table/table-tags.svelte';

	export let data;
</script>

<div class="mb-3 flex justify-between">
	<div>
		<span class="font-bold">Tag Management of {data.tagGroupName}</span>
	</div>
	<DialogCreateTag form={data.forms.create} />
</div>

{#if data.response.items.length === 0}
	<div class="flex justify-center font-semibold">No tag groups created yet!</div>
{:else}
	<TableTags {data} />
	<TablePagination data={data.response} />
{/if}
