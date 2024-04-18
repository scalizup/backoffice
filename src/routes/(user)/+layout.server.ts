import api from '$lib/api/api';
import type { PageServerLoad } from './products/$types';

export const load: PageServerLoad = async () => {
	const user = await api.auth.getMe();

	return {
		user
	};
};
