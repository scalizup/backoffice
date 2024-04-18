import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tag-groups/schemas';
import api from '$lib/api/api';
import { redirectIfNoItems } from '$lib';

export const load: PageServerLoad = async ({ params, url, locals, request }) => {
	const page = url.searchParams.get('page') || '1';

	const response = await api.tagGroups.getAll({
		pageNumber: params ? parseInt(page) : 1,
		pageSize: 5
	});

	redirectIfNoItems(response, `/tag-groups`);

	return {
		response: response,
		forms: {
			create: await superValidate(zod(createSchema)),
			update: await superValidate(zod(updateSchema)),
			delete: await superValidate(zod(deleteSchema))
		}
	};
};

export const actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(createSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await api.tagGroups.post({
			name: form.data.name
		});

		return {
			form
		};
	},
	update: async (event) => {
		const form = await superValidate(event, zod(updateSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await api.tagGroups.patch({
			id: form.data.id,
			name: form.data.name
		});

		return {
			form
		};
	},
	delete: async (event) => {
		const form = await superValidate(event, zod(deleteSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await api.tagGroups.delete(form.data.id);

		return {
			form
		};
	}
};
