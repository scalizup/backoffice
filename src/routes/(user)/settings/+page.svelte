<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input';
	import { createSchema } from '$lib/components/tenant-configuration/schemas.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ListFilter } from 'lucide-svelte';
	import clsx from 'clsx';

	export let data;

	const form = superForm(data.forms.create, {
		validators: zodClient(createSchema)
	});

	const { form: formData, enhance } = form;

	const scheduleOptions = [
		{
			key: 'all-day',
			label: 'All day',
			componentLabels: ['Start', 'End', 'Break start', 'Break end']
		},
		{
			key: 'morning',
			label: 'Morning',
			componentLabels: ['Start', 'End']
		},
		{
			key: 'afternoon',
			label: 'Afternoon',
			componentLabels: ['Start', 'End']
		},
		{
			key: 'closed',
			label: 'Closed',
			componentLabels: []
		}
	];

	const days = [
		{
			day: 'Sunday',
			start: '08:00',
			breakStart: '13:00',
			scheduleOptionKey: 'morning'
		},
		{
			day: 'Monday',
			start: '08:00',
			breakStart: '13:00',
			breakEnd: '15:00',
			end: '20:00',
			scheduleOptionKey: 'all-day'
		},
		{
			day: 'Tuesday',
			start: '08:00',
			breakStart: '13:00',
			breakEnd: '15:00',
			end: '20:00',
			scheduleOptionKey: 'closed'
		},
		{
			day: 'Wednesday',
			breakStart: '13:00',
			breakEnd: '15:00',
			end: '20:00',
			scheduleOptionKey: 'afternoon'
		}
	];
</script>

<div class="flex justify-between">
	<span class="font-bold">Personalize your business</span>
	<Button>Save changes</Button>
</div>

<div class="max-w-fit">
	<h2 class="font-bold">Colors</h2>
	<form method="POST" use:enhance>
		<div class="flex gap-2">
			<Form.Field {form} name="primaryColor">
				<Form.Control let:attrs>
					<Form.Label>Primary</Form.Label>
					<Input {...attrs} type="color" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="secondaryColor">
				<Form.Control let:attrs>
					<Form.Label>Secondary</Form.Label>
					<Input {...attrs} type="color" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</form>

	<form method="POST" use:enhance>
		<h2 class="font-bold">Schedule</h2>
		<div class="max flex gap-2 overflow-x-auto rounded-xl shadow-lg">
			{#each days as day, i}
				<div
					class={clsx('flex flex-col gap-2 p-2', {
						'bg-gray-100': i % 2 === 0
					})}
				>
					{#each scheduleOptions.filter((s) => s.key === day.scheduleOptionKey) as scheduleOption}
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="outline" size="sm" class="h-7 gap-1">
									<ListFilter class="h-3.5 w-3.5" />
									<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> {day.day} </span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>Is open...</DropdownMenu.Label>
								<DropdownMenu.Separator />
								{#each scheduleOptions as option}
									<DropdownMenu.CheckboxItem checked={day.scheduleOptionKey === option.key}>
										{option.label}
									</DropdownMenu.CheckboxItem>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						{#if scheduleOption.key === 'closed'}
							<p class="text-red-500">Closed</p>
						{:else}
							{#each scheduleOption.componentLabels as label}
								<Form.Field {form} name={`days[${i}].${label}`}>
									<Form.Control let:attrs>
										<Form.Label>{label}</Form.Label>
										<Input {...attrs} type="time" />
									</Form.Control>
									<Form.Description />
									<Form.FieldErrors />
								</Form.Field>
							{/each}
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</form>
</div>
