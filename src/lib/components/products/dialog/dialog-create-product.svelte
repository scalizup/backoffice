<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createSchemaStep1, createSchemaStep2, type CreateSchemaStep2 } from '../schemas';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import type { GetTagGroupsWithTagsResponse } from '$lib/api/contracts/tag_groups/queries/getAllTagGroupsWithTags';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { createSearchStore } from '$lib/stores/createSearchStore';
	import { onDestroy } from 'svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { type GetTagGroupWithTagsBySearchTermResponse } from '$lib/api/contracts/tag_groups/queries/getTagGroupWithTagsBySearchTerm';

	let open = true;

	export let form: SuperValidated<Infer<CreateSchemaStep2>>;
	export let tagCategoriesWithTags: GetTagGroupsWithTagsResponse;

	const steps = [zod(createSchemaStep1), zod(createSchemaStep2)];
	let step = 2;

	const _form = superForm(form, {
		dataType: 'json',
		async onSubmit({ cancel }) {
			if (step == steps.length) return;
			else cancel();

			const result = await _form.validateForm({ update: true });

			if (result.valid) step = step + 1;
		},

		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});

	const { form: formData, enhance } = _form;

	const searchStore = createSearchStore(tagCategoriesWithTags);

	const unsubscribe = searchStore.subscribe((model) => {
		const searchTerm = model.search.toLowerCase().trim() || '';

		if (searchTerm.length === 0) {
			// Return only the data that $searchStore.selectedData does not have
			const selectedTagIds = model.selectedData
				.map((tagCategory) => tagCategory.tags.map((tag) => tag.id))
				.flat();

			const filteredData = model.data
				.map((tagCategory) => {
					return {
						...tagCategory,
						tags: tagCategory.tags.filter((tag) => !selectedTagIds.includes(tag.id))
					};
				})
				.filter((tagCategory) => tagCategory.tags.length > 0);

			model.filtered = [...filteredData];

			// model.filtered = [...model.data.filter((tagCategory) => tagCategory.tags?.length > 0)];
			return;
		}

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
			console.log('Im here');
			model.filtered = filteredData;
			return;
		} else {
			const data = new FormData();
			data.append('searchTerm', $searchStore.search);

			fetch('?/getTagGroupsWithTagsBySearchTerm', {
				method: 'POST',
				body: data
			}).then(async (response) => {
				const result: ActionResult = deserialize(await response.text())!;
				if (result.type === 'error') {
					return;
				}
				if (result.type === 'success') {
					const requestedTagGroups = result.data as GetTagGroupWithTagsBySearchTermResponse;

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
	});

	onDestroy(() => unsubscribe());

	$: {
		console.log($searchStore.filtered);

		_form.options.validators = steps[step - 1];
	}
</script>

<Button
	on:click={() => {
		open = true;
		step = 1;
		_form.reset();
	}}>Create a Product</Button
>
<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if step == 1}
					Create a Product
				{:else}
					Configure Tags
				{/if}
			</Dialog.Title>
			<Dialog.Description>
				{#if step == 1}
					Please fill in the following fields to create a new product.
				{:else}
					Please select the tags that will be associated with the product.
				{/if}
			</Dialog.Description>
			<form method="POST" action="?/create" use:enhance>
				{#if step == 1}
					<Form.Field form={_form} name="name">
						<Form.Control let:attrs>
							<Form.Label>Product Name</Form.Label>
							<Input {...attrs} bind:value={$formData.name} placeholder="fish and chips..." />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={_form} name="description">
						<Form.Control let:attrs>
							<Form.Label>
								Description
								<span class="italic">(optional)</span>
							</Form.Label>
							<Textarea
								{...attrs}
								bind:value={$formData.description}
								placeholder="a awesome roasted fish..."
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={_form} name="price">
						<Form.Control let:attrs>
							<Form.Label>
								Price
								<span class="italic">(optional)</span>
							</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.price}
								step=".01"
								placeholder="0.00"
								type="number"
								on:change={() => $formData.price?.toFixed(2)}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Button>Configure Tags</Form.Button>
				{:else}
					<form method="POST" action="?/getTagGroupsWithTagsBySearchTerm">
						<Input
							type="search"
							placeholder="Search tags..."
							class="w-full"
							bind:value={$searchStore.search}
						/>
					</form>
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

					<ScrollArea class="mx-auto h-[200px] border-t-8 border-t-black">
						<div class="px-2 py-2">
							{#if $searchStore.selectedData.length === 0}
								<p>Please select some tags</p>
							{/if}
							{#each $searchStore.selectedData as tagCategory}
								<div class="mb-2 text-sm">
									{tagCategory.name}
								</div>
								{#each tagCategory.tags as tag}
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

												// If the tag category doesn't have any tags selected
												// remove the tag category from the selected data
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
						</div>
					</ScrollArea>

					<Form.Button>Create Product</Form.Button>
				{/if}
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
