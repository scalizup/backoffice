import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { signInSchema } from '$lib/schemas/auth_schemas';
import { setAuthorizationCookies } from '$lib/helpers/setAuthorizationCookies';
import api from '$lib/api/api';

export const load: PageServerLoad = async () => {
	return {
		forms: {
			signIn: await superValidate(zod(signInSchema))
		}
	};
};

export const actions: Actions = {
	signIn: async (event) => {
		const form = await superValidate(event.request, zod(signInSchema));

		const { accessToken, refreshToken } = await api.auth.login(form.data);

		setAuthorizationCookies(event, accessToken, refreshToken);
	}
};
