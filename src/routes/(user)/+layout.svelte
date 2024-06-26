<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import {
		Bell,
		Menu,
		Package2,
		Settings,
		ShoppingCart,
		CircleUser,
		Package,
		Home
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Navlink from './navlink.svelte';
	import { redirect } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let formElement: HTMLFormElement;

	export let data;
</script>

<Toaster richColors />

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="">{data.user.tenant.name}</span>
				</a>
				<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
					<Bell class="h-4 w-4" />
					<span class="sr-only">Toggle notifications</span>
				</Button>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<Navlink href="/tag-groups" title="Tag Groups" icon={Home} />
					<!-- <Navlink href="/tags" title="Tags" icon={Package} /> -->
					<Navlink href="/products" title="Products" icon={ShoppingCart} />
					<Navlink href="/settings" title="Settings" icon={Settings} />
					<!-- <Navlink href="/customers" title="Customers" icon={Users} />
					<Navlink href="/analytics" title="Analytics" icon={LineChart} /> -->
				</nav>
			</div>
			<div class="mt-auto p-4">
				<Card.Root>
					<Card.Header class="p-2 pt-0 md:p-4">
						<Card.Title>Upgrade to Pro</Card.Title>
						<Card.Description>
							Unlock all features and get unlimited access to our support team.
						</Card.Description>
					</Card.Header>
					<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" class="w-full">Upgrade</Button>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="mt-4 grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<span class="sr-only">Your tenant</span>
						</a>
						<Navlink href="/tag-groups" title="Tag Groups" icon={Home} isMobile />
						<Navlink href="/tags" title="Tags" icon={Package} isMobile />
						<Navlink href="/products" title="Products" icon={ShoppingCart} isMobile />
					</nav>
					<div class="mt-auto">
						<Card.Root>
							<Card.Header>
								<Card.Title>Upgrade to Pro</Card.Title>
								<Card.Description>
									Unlock all features and get unlimited access to our support team.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Button size="sm" class="w-full">Upgrade</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<div class="flex-1"></div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>{data.user.username}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />

					<form method="post" action="/" use:enhance bind:this={formElement}>
						<DropdownMenu.Item on:click={(e) => formElement.requestSubmit()}>
							Logout
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-6">
			<slot />
		</main>
	</div>
</div>
