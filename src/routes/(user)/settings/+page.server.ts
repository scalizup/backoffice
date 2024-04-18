import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { createSchema } from '$lib/components/tenant-configuration/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		forms: {
			create: await superValidate(zod(createSchema))
		}
	};
};
