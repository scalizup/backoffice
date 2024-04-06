import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { signUpSchema } from '$lib/schemas/auth_schemas';

export const load: PageServerLoad = async () => {
	return {
		forms: {
			signUp: await superValidate(zod(signUpSchema))
		}
	};
};

export const actions: Actions = {
	signUp: async ({ request, locals, cookies, setHeaders }) => {
		const form = await superValidate(request, zod(signUpSchema));

		// Implement your sign-up logic here
	}
};
