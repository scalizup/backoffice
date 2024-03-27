<script lang="ts">
	import { Badge, type Variant } from '$lib/components/ui/badge';

	export let name: string;
	export let isActive: boolean;

	let isActiveProps: {
		name: string;
		variant: Variant;
	};

	$: isActiveProps = {
		name: isActive ? 'Active' : 'Disabled',
		variant: isActive ? 'secondary' : 'default'
	};
</script>

<div class="flex flex-col">
	{name}
	<Badge variant={isActiveProps.variant} class="w-fit">{isActiveProps.name}</Badge>
</div>
