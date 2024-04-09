import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchema, deleteSchema, updateSchema } from '$lib/components/tenants/schemas';
import { api, redirectIfNoItems } from '$lib';

export const load: PageServerLoad = async ({ url }) => {
	const params = url.searchParams.get('page');

	const response = await api.tenantList({
		PageNumber: params ? parseInt(params) : 1,
		PageSize: 5
	});

	redirectIfNoItems(response.data, '/admin/tenants');

	return {
		tenants: response.data,
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

		await api.tenantCreate({
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

		await api.tenantPartialUpdate({
			id: form.data.id,
			name: form.data.name,
			isActive: form.data.isActive
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

		await api.tenantDelete(form.data.id);

		return {
			form
		};
	}
};
