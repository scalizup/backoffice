<script lang="ts">
	import DialogCreateProduct from '$lib/components/products/dialog/dialog-create-product.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ListFilter, Search } from 'lucide-svelte';
	import { Pencil, Trash2 } from 'lucide-svelte/icons';
	import DialogSeeProductTags from '$lib/components/products/dialog/dialog-see-product-tags.svelte';
	import { Input } from '$lib/components/ui/input/index.js';

	export let data;
</script>

<div class="flex justify-between">
	<div>
		<span class="font-bold">Products Management</span>
	</div>
	<DialogCreateProduct form={data.forms.create} />
</div>

{#if data.response.products.length == 0}
	<div class="flex justify-center font-semibold">No products created yet!</div>
{:else}
	<div class="relative flex justify-start">
		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input
			type="search"
			placeholder="Search products..."
			class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" type="submit" class="h-7 gap-1 text-sm" builders={[builder]}>
					<ListFilter class="h-3.5 w-3.5" />
					<span class="sr-only sm:not-sr-only">Filter</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Filter by</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.CheckboxItem checked>Name</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem>Tag</DropdownMenu.CheckboxItem>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
		{#each data.response.products as product}
			<Card.Root class="flex flex-col justify-between">
				<Card.Header>
					<div class="relative h-32 w-full">
						<img
							src={product.imageUrl}
							alt={product.name}
							class="h-full w-full rounded-lg object-cover"
						/>
					</div>
					<Card.Title>{product.name}</Card.Title>
					<Card.Description>{product.price} $</Card.Description>
				</Card.Header>
				<Card.Footer class="gap-2">
					<DialogSeeProductTags productName={product.name} tags={product.tags} />
					<div class="flex gap-2">
						<Button variant="outline" size="sm" class="w-full">
							<Pencil class="h-4 w-4" />
						</Button>
						<Button variant="outline" size="sm" class="w-full">
							<Trash2 class="h-4 w-4" />
						</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
{/if}
