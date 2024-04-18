import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tag-groups/schemas';
import api from '$lib/api/api';
import { redirectIfNoItems } from '$lib';

export const load: PageServerLoad = async ({ params, url }) => {
	const page = url.searchParams.get('page') || '1';

	const tagGroup = await api.tagGroups.getById(parseInt(params.tagGroupId));

	const response = await api.tags.getAll({
		tagGroupId: tagGroup.id,
		pageNumber: params ? parseInt(page) : 1,
		pageSize: 5
	});

	redirectIfNoItems(response, `/tag-groups`);

	return {
		response: response,
		tagGroupName: tagGroup.name,
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

		await api.tags.post({
			tagGroupId: parseInt(event.params.tagGroupId),
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

		await api.tags.patch({
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

		await api.tags.delete(form.data.id);

		return {
			form
		};
	}
};
