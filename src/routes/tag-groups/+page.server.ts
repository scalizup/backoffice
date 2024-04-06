import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tag-groups/schemas';
import { api, redirectIfNoItems } from '$lib';

export const load: PageServerLoad = async ({ params, url, locals, request }) => {
	const page = url.searchParams.get('page') || '1';

	const response = await api.tagGroupList(
		{
			PageNumber: params ? parseInt(page) : 1,
			PageSize: 5
		},
		{
			headers: {
				RefreshToken: locals.refreshToken!,
				Authorization: locals.accessToken!
			}
		}
	);

	redirectIfNoItems(response.data, `/tag-groups`);

	return {
		response: response.data,
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

		await api.tagGroupCreate(
			{
				name: form.data.name
			},
			{
				headers: {
					RefreshToken: event.locals.refreshToken!,
					Authorization: event.locals.accessToken!
				}
			}
		);

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

		await api.tagGroupPartialUpdate(
			{
				id: form.data.id,
				name: form.data.name
			},
			{
				headers: {
					RefreshToken: event.locals.refreshToken!,
					Authorization: event.locals.accessToken!
				}
			}
		);

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

		await api.tagGroupDelete(form.data.id, {
			headers: {
				RefreshToken: event.locals.refreshToken!,
				Authorization: event.locals.accessToken!
			}
		});

		return {
			form
		};
	}
};
