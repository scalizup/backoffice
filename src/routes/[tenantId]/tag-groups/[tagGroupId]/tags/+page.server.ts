import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tag-groups/schemas';
import { api, getTagGroupId, getTenantId, redirectIfNoItems } from '$lib';
import { z } from 'zod';

export const load: PageServerLoad = async ({ params, url }) => {
	const page = url.searchParams.get('page') || '1';

	const tenantId = await getTenantId(params);
	const tagGroupId = await getTagGroupId(params);

	const response = await api.getApi({
		tagGroupId,
		PageNumber: params ? parseInt(page) : 1,
		PageSize: 5
	});

	redirectIfNoItems(response.data, `/${tenantId}/tag-groups`);

	return {
		response: response.data,
		tenantId,
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

		await api.postApi({
			tenantId: await getTenantId(event.params),
			tagGroupId: await getTagGroupId(event.params),
			name: form.data.name
		});

		return {
			form
		};
	}
	// update: async (event) => {
	// 	const form = await superValidate(event, zod(updateSchema));
	// 	if (!form.valid) {
	// 		return fail(400, {
	// 			form
	// 		});
	// 	}

	// 	await api.tagGroupPartialUpdate({
	// 		id: form.data.id,
	// 		name: form.data.name
	// 	});

	// 	return {
	// 		form
	// 	};
	// },
	// delete: async (event) => {
	// 	const form = await superValidate(event, zod(deleteSchema));
	// 	if (!form.valid) {
	// 		return fail(400, {
	// 			form
	// 		});
	// 	}

	// 	await api.tagGroupDelete(form.data.id);

	// 	return {
	// 		form
	// 	};
	// }
};
