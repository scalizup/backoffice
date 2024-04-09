<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schemaStep1, schemaStep2 } from './schema.js';

	export let data;

	const steps = [zod(schemaStep1), zod(schemaStep2)];
	let step = 1;

	$: options.validators = steps[step - 1];

	const { form, errors, message, enhance, validateForm, options } = superForm(data.form, {
		// No need for hidden fields with dataType: 'json'
		dataType: 'json',
		async onSubmit({ cancel }) {
			// If on last step, make a normal request
			if (step == steps.length) return;
			else cancel();

			// Make a manual client-side validation, since we have cancelled
			const result = await validateForm({ update: true });
			if (result.valid) step = step + 1;
		},

		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});
</script>

{#if $message}
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<div class="status" class:error={$page.status >= 400} class:success={$page.status == 200}>
		{$message}
	</div>
{/if}

<h3>Step {step}</h3>

<form method="POST" use:enhance>
	{#if step == 1}
		<label>
			Name<br />
			<input name="name" aria-invalid={$errors.name ? 'true' : undefined} bind:value={$form.name} />
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		</label>
		<label>
			Price<br />
			<input
				name="number"
				aria-invalid={$errors.price ? 'true' : undefined}
				bind:value={$form.price}
			/>
			{#if $errors.price}<span class="invalid">{$errors.price}</span>{/if}
		</label>
		<button>Next step</button>
	{:else}
		<p>Hello {$form.name}, just one more step!</p>
		<label>
			Email<br />
			<input name="tags" aria-invalid={$errors.tags ? 'true' : undefined} bind:value={$form.tags} />
			{#if $errors.tags}<span class="invalid">{JSON.stringify($errors.tags)}</span>{/if}
		</label>

		<button>Submit</button>
	{/if}
</form>

<SuperDebug data={$form} />

<style>
	.invalid {
		color: red;
	}

	.status {
		color: white;
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
	}

	.status.success {
		background-color: seagreen;
	}

	.status.error {
		background-color: #ff2a02;
	}

	input {
		background-color: #ddd;
	}

	a {
		text-decoration: underline;
	}

	hr {
		margin-top: 4rem;
	}

	form {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
