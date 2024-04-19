<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { upsertMenuSortSchema } from '$lib/components/tenant-configuration/schemas.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button/index.js';
	import Board from './tag-organizers/board.svelte';

	export let data;
</script>

<div class="flex justify-between">
	<span class="font-bold">Personalize your business</span>
	<Button>Save changes</Button>
</div>

<div class="max-w-fit">
	<!-- <h2 class="font-bold">Colors</h2>
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
	</form> -->

	<h2 class="font-bold">Menu Order</h2>
	<Board
		data={{
			tagGroupsWithTags: data.tagGroupsWithTags,
			menuSort: data.menuSort,
			upsertMenuSortForm: data.forms.upsertMenuSort
		}}
	/>
</div>
