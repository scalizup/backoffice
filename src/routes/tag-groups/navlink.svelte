<script lang="ts">
	import { page } from '$app/stores';
	import clsx from 'clsx';

	export let title: string;
	export let href: string;
	export let icon: any;
	export let isMobile = false;

	function isActive() {
		return $page.url.pathname.includes(href);
	}
</script>

{#if isMobile}
	<a
		{href}
		class={clsx(
			'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground',
			{
				'bg-muted text-foreground': isActive(),
				'text-muted-foreground': !isActive()
			}
		)}
	>
		<svelte:component this={icon} class="h-5 w-5" />
		{title}
	</a>
{:else}
	<a
		{href}
		class={clsx(
			'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
			{
				'bg-muted text-primary': isActive()
			}
		)}
	>
		<svelte:component this={icon} class="h-4 w-4" />
		{title}
	</a>
{/if}
