import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { signInSchema } from '$lib/schemas/auth_schemas';
import { signIn } from '$lib/api/contracts/auth/commands/signIn';
import { setAuthorizationCookies } from '$lib/helpers/setAuthorizationCookies';

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

		const { accessToken, refreshToken } = await signIn(form.data);

		setAuthorizationCookies(event, accessToken, refreshToken);
	}
};
