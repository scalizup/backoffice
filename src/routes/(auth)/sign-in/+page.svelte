<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signInSchema } from '$lib/schemas/auth_schemas.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;

	const form = superForm(data.forms.signIn, {
		id: 'sign-in',
		validators: zodClient(signInSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your username below to access your business</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/signIn" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input {...attrs} bind:value={$formData.username} placeholder="eduard" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<div class="flex items-center">
								<Form.Label>Password</Form.Label>
								<a href="##" class="ml-auto inline-block text-sm underline">
									Forgot your password?
								</a>
							</div>
							<Input
								{...attrs}
								bind:value={$formData.password}
								placeholder="not123please"
								type="password"
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/sign-up" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root>
