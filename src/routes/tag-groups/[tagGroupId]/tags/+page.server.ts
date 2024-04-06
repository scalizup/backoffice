import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tag-groups/schemas';
import { api, getTagGroupId, redirectIfNoItems } from '$lib';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const page = url.searchParams.get('page') || '1';

	const tagGroupId = await getTagGroupId(params);

	const response = await api.getApi(
		{
			tagGroupId,
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

	const tagGroupName = await (
		await api.tagGroupDetail(tagGroupId, {
			headers: {
				RefreshToken: locals.refreshToken!,
				Authorization: locals.accessToken!
			}
		})
	).data.name;

	redirectIfNoItems(response.data, `/tag-groups`);

	return {
		response: response.data,
		tagGroupName,
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

		await api.postApi(
			{
				tagGroupId: await getTagGroupId(event.params),
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

		await api.patchApi(
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

		await api.deleteApi(form.data.id, {
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
