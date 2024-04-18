import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
	createSchemaStep2,
	deleteSchema,
	updateSchema,
	updateSchemaStep2
} from '$lib/components/products/schemas';
import type { Actions, PageServerLoad } from './$types';
import api from '$lib/api/api';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const page = url.searchParams.get('page') || '1';

	const response = await api.tagGroups.getAllWithTags({
		pageNumber: params ? parseInt(page) : 1,
		pageSize: 50
	});

	const test = await api.products.getAll();

	return {
		response: {
			tags: response,
			products: test.items
		},
		forms: {
			create: await superValidate(zod(createSchemaStep2)),
			update: await superValidate(zod(updateSchema)),
			updateTags: await superValidate(zod(updateSchemaStep2)),
			delete: await superValidate(zod(deleteSchema))
		}
	};
};

export const actions: Actions = {
	getTagGroupsWithTagsBySearchTerm: async ({ request }) => {
		const data = await request.formData();

		const response = await api.tagGroups.getBySearchTerm(data.get('searchTerm') as string);

		return response;
	},
	create: async (event) => {
		const form = await superValidate(event, zod(createSchemaStep2));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, tagIds, description, price, image } = form.data;

		await api.products.post({
			name,
			description,
			price,
			tagIds,
			image
		});

		return withFiles({ form });
	},
	update: async (event) => {
		const form = await superValidate(event, zod(updateSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { id, name, description, price, image } = form.data;

		await api.products.patch(id, {
			name,
			description,
			price,
			tagIds: null!,
			image
		});

		return {
			form
		};
	},
	updateTags: async (event) => {
		const form = await superValidate(event, zod(updateSchemaStep2));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { id, tagIds } = form.data;

		console.log(tagIds);

		await api.products.patch(id, {
			name: null!,
			description: null!,
			price: null!,
			image: null!,
			tagIds
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

		const { id } = form.data;

		await api.products.delete(id);

		return {
			form
		};
	}
};
