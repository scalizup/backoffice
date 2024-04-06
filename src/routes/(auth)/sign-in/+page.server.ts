import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { api } from '$lib';
import { signInSchema } from '$lib/schemas/auth_schemas';

export const load: PageServerLoad = async () => {
	return {
		forms: {
			signIn: await superValidate(zod(signInSchema))
		}
	};
};

export const actions: Actions = {
	signIn: async ({ request, locals, cookies, setHeaders }) => {
		const form = await superValidate(request, zod(signInSchema));

		const response = await api.usersLoginCreate(form.data);

		cookies.set('Authorization', `Bearer ${response.data.token}`, {
			path: '/'
		});

		cookies.set('RefreshToken', response.data.refreshToken, {
			path: '/'
		});
	}
};
