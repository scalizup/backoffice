<script lang="ts">
	import TablePagination from '$lib/components/shared/table-pagination.svelte';
	import CreateTenant from '$lib/components/tenants/dialogs/dialog-create-tenant.svelte';
	import TableTenants from '$lib/components/tenants/table/table-tenants.svelte';

	export let data;
</script>

<div class="mb-3 flex justify-end">
	<CreateTenant data={data.forms.create} />
</div>

{#if data.tenants.items.length === 0}
	<p>No tenants found.</p>
{:else}
	<TableTenants {data} />
	<TablePagination data={data.tenants} />
{/if}
