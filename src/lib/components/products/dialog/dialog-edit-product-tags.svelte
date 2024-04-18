<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import type { ActionResult } from '@sveltejs/kit';
	import { deserialize } from '$app/forms';
	import { createSearchStore } from '$lib/stores/createSearchStore';
	import { onDestroy } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { updateSchemaStep2 } from '../schemas';
	import { Button } from '$lib/components/ui/button';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { ProductResponse } from '$lib/api/clients/products';
	import type { TagGroup } from '$lib/api/clients/tag_groups';

	export let tagCategoriesWithTags: TagGroup[];

	const searchStore = createSearchStore(tagCategoriesWithTags);

	const unsubscribe = searchStore.subscribe((model) => {
		const searchTerm = model.search.toLowerCase().trim() || '';

		const filteredData = model.data
			.map((tagCategory) => {
				if (tagCategory.name.toLowerCase().includes(searchTerm)) {
					return {
						...tagCategory,
						tags: tagCategory.tags
					};
				}

				return {
					...tagCategory,
					tags: tagCategory.tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm))
				};
			})
			.filter((tagCategory) => tagCategory.tags.length > 0);

		if (filteredData.length > 0) {
			model.filtered = filteredData;
		} else {
			const data = new FormData();
			data.append('searchTerm', $searchStore.search);

			fetch('?/getTagGroupsWithTagsBySearchTerm', {
				method: 'POST',
				body: data
			}).then(async (response) => {
				const result: ActionResult = deserialize(await response.text())!;
				if (result.type === 'error') {
					// return;
				}

				if (result.type === 'success') {
					const requestedTagGroups = result.data as TagGroup[];

					if (requestedTagGroups.length === 0) {
						return;
					}

					requestedTagGroups.forEach((tg) => {
						const index = model.data.findIndex((tagCategory) => tagCategory.id === tg.id);

						if (index < 0) {
							$searchStore.data = [...model.data, tg];
						} else {
							$searchStore.data = [
								...model.data.slice(0, index),
								{
									...model.data[index],
									tags: tg.tags
								},
								...model.data.slice(index + 1)
							];
						}
					});
				}
			});
		}

		const selectedTagIds = model.selectedData
			.map((tagCategory) => tagCategory.tags.map((tag) => tag.id))
			.flat();

		const dataWithoutSelectedOnes = filteredData
			.map((tagCategory) => {
				return {
					...tagCategory,
					tags: tagCategory.tags.filter((tag) => !selectedTagIds.includes(tag.id))
				};
			})
			.filter((tagCategory) => tagCategory.tags.length > 0);

		model.filtered = [...dataWithoutSelectedOnes];
	});

	onDestroy(() => unsubscribe());

	let open = false;
	export let product: ProductResponse;
	export let form: SuperValidated<Infer<typeof updateSchemaStep2>>;

	const _form = superForm(form, {
		dataType: 'json',
		id: product.id.toString() + '-update',
		validators: zodClient(updateSchemaStep2),
		onSubmit: async ({ cancel }) => {},
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.warning(`Tags of ${product.name} (${product.id}) has been updated.`);
				open = false;
			}
		}
	});

	const { form: formData, enhance } = _form;

	$: {
		$formData.tagIds = $searchStore.selectedData
			.map((tagCategory) => tagCategory.tags.map((tag) => tag.id))
			.flat();
	}
</script>

<Button
	on:click={() => {
		_form.reset();
		$formData = {
			...product
		};
		$searchStore.selectedData = [...product.tagGroups];
		open = true;
	}}
	variant="outline"
	size="sm"
	class="w-full">Tags</Button
>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update tags of {product.name}</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/updateTags" use:enhance>
			<Input
				type="search"
				placeholder="Search tags..."
				class="w-full"
				bind:value={$searchStore.search}
			/>
			<ScrollArea class="mx-auto h-[200px]">
				<div class="px-2 py-2">
					{#each $searchStore.filtered as tagCategory}
						<div class="mb-2 text-sm">
							{tagCategory.name}
						</div>
						{#each tagCategory.tags as tag}
							<div class="mb-2 flex items-center space-x-2">
								<Checkbox
									id={tag.id.toString()}
									value={tag.id.toString()}
									on:click={(e) => {
										e.preventDefault();
										const selectedTag = {
											id: tagCategory.id,
											name: tagCategory.name,
											tags: [
												{
													id: tag.id,
													name: tag.name
												}
											]
										};

										const index = $searchStore.selectedData.findIndex(
											(selectedTagCategory) => selectedTagCategory.id === tagCategory.id
										);

										if (index < 0) {
											$searchStore.selectedData = [...$searchStore.selectedData, selectedTag];
										} else {
											$searchStore.selectedData = [
												...$searchStore.selectedData.slice(0, index),
												{
													...$searchStore.selectedData[index],
													tags: [
														...$searchStore.selectedData[index].tags,
														{
															id: tag.id,
															name: tag.name
														}
													]
												},
												...$searchStore.selectedData.slice(index + 1)
											];
										}
									}}
								/>
								<Label
									for={tag.id.toString()}
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{tag.name}
								</Label>
							</div>
						{/each}
						<Separator class="my-2" />
					{/each}
				</div>
			</ScrollArea>

			<Form.Field form={_form} name="tagIds">
				<ScrollArea class="mx-auto h-[200px] border-t-8 border-t-black">
					<div class="px-2 py-2">
						{#if $searchStore.selectedData.length === 0}
							<p>Please select some tags</p>
						{/if}
						{#each $searchStore.selectedData as tagCategory}
							<div class="mb-2 text-sm">
								{tagCategory.name}
							</div>
							{#each tagCategory.tags as tag, i}
								<div class="mb-2 flex items-center space-x-2">
									<Checkbox
										id={tag.id.toString() + '_selected'}
										value={tag.id.toString()}
										on:click={(e) => {
											e.preventDefault();
											const index = $searchStore.selectedData.findIndex(
												(selectedTagCategory) => selectedTagCategory.id === tagCategory.id
											);

											if (index < 0) {
												return;
											}

											const selectedTag = {
												id: tagCategory.id,
												name: tagCategory.name,
												tags: tagCategory.tags.filter((t) => t.id !== tag.id)
											};

											if (selectedTag.tags.length === 0) {
												$searchStore.selectedData = [
													...$searchStore.selectedData.slice(0, index),
													...$searchStore.selectedData.slice(index + 1)
												];
												return;
											}

											$searchStore.selectedData = [
												...$searchStore.selectedData.slice(0, index),
												selectedTag,
												...$searchStore.selectedData.slice(index + 1)
											];
										}}
										checked={true}
									/>
									<Label
										for={tag.id.toString() + '_selected'}
										class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{tag.name}
									</Label>
								</div>
							{/each}
							<Separator class="my-2" />
						{/each}
						<Form.FieldErrors />
					</div>
				</ScrollArea>
			</Form.Field>

			<Form.Button>Update Tags</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
