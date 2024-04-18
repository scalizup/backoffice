import api from '$lib/api/api';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		await api.auth.logout();

		event.cookies.delete('Authorization', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict'
		});
		event.cookies.delete('RefreshToken', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict'
		});

		event.locals.accessToken = null;
		event.locals.refreshToken = null;

		throw redirect(303, '/sign-in');
	}
};
