<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import type { TagGroup } from '$lib/api/clients/tag_groups';
	import type { MenuSort } from '$lib/api/clients/menu_sort';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { upsertMenuSortSchema } from '$lib/components/tenant-configuration/schemas';
	import { toast } from 'svelte-sonner';

	export let data: {
		tagGroupsWithTags: TagGroup[];
		menuSort: MenuSort;
		upsertMenuSortForm: SuperValidated<Infer<typeof upsertMenuSortSchema>>;
	};

	const tagGroups = data.tagGroupsWithTags;

	let tagsOrderItems: {
		id: number;
		name: string;
	}[] = [];

	function handleDndConsider(e) {
		tagsOrderItems = e.detail.items;
	}

	function handleDndFinalize(e) {
		tagsOrderItems = e.detail.items;
	}

	let open = false;
	let value = '';
	let selectedValue = '';

	if (data.menuSort) {
		value = data.menuSort.tagGroupName;
	}

	$: {
		const tagGroup = tagGroups.find((f) => f.name === value)!;
		if (!tagGroup) {
			selectedValue = 'Select a tag group...';
			tagsOrderItems = [];
		} else {
			selectedValue = tagGroup.name ?? 'Select a tag group...';

			if (value !== data.menuSort?.tagGroupName) {
				tagsOrderItems = tagGroups
					.find((f) => f.name === value)!
					.tags.map((tag) => ({
						id: tag.id,
						name: tag.name
					}));
			} else {
				tagsOrderItems = data.menuSort.tags.map((tag) => ({
					id: tag.id,
					name: tag.name
				}));
			}

			$formData.tagGroupId = tagGroup.id;
		}
	}

	$: $formData.orderOfTagIds = tagsOrderItems.map((tag) => tag.id);

	const form = superForm(data.upsertMenuSortForm, {
		validators: zodClient(upsertMenuSortSchema),
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Menu ordered configured.');
			}
		}
	});

	const { form: formData, enhance } = form;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<form method="POST" action="?/configureMenuSort" use:enhance>
	{#if tagGroups.length === 0}
		<p>No tag groups found. Please create a tag group first with associated tags.</p>
	{:else}
		<div>
			<Popover.Root bind:open let:ids>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="mb-2 w-[200px] justify-between"
					>
						{selectedValue}
						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input placeholder="Search tag group..." />
						<Command.Empty>No tag group found.</Command.Empty>
						<Command.Group>
							{#each tagGroups as tagGroup}
								<Command.Item
									value={tagGroup.name}
									onSelect={(currentValue) => {
										value = currentValue;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check
										class={cn('mr-2 h-4 w-4', value !== tagGroup.name && 'text-transparent')}
									/>
									{tagGroup.name}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>

			<section
				class="max-w-fit"
				use:dndzone={{ items: tagsOrderItems, flipDurationMs: 100, dropTargetStyle: {} }}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each tagsOrderItems as item, i (item.id)}
					<div animate:flip={{ duration: 150 }} class="mb-2">
						<Card.Root>
							<Card.Header class="px-2 py-4 text-sm">
								<Card.Title class="flex items-center gap-1">
									<Badge>{i + 1}</Badge>
									{item.name}
								</Card.Title>
							</Card.Header>
						</Card.Root>
					</div>
				{/each}
			</section>
		</div>

		<Button type="submit">Save</Button>
	{/if}
</form>
