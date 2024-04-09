<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '$lib/components/ui/button/button.svelte';

	let open = false;

	export let productName: string;
	export let tags: string[] = [];
</script>

<Button on:click={() => (open = true)} variant="outline" size="sm" class="w-full">Tags</Button>
<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Tags of {productName}</Dialog.Title>
		</Dialog.Header>
		{#each tags as tag}
			<span class="text-sm">{tag}</span>
		{/each}
	</Dialog.Content>
</Dialog.Root>
