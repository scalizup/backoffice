import { fail, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { upsertMenuSortSchema } from '$lib/components/tenant-configuration/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import api from '$lib/api/api';

export const load: PageServerLoad = async () => {
	const menuSort = await api.menuSort.get();

	const tagGroupsWithTags = await api.tagGroups.getAllWithTags({
		pageNumber: 1,
		pageSize: 100
	});

	return {
		menuSort,
		tagGroupsWithTags: tagGroupsWithTags.items,
		forms: {
			upsertMenuSort: await superValidate(zod(upsertMenuSortSchema))
		}
	};
};

export const actions = {
	configureMenuSort: async (event) => {
		const form = await superValidate(event, zod(upsertMenuSortSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log(form.data.orderOfTagIds);

		await api.menuSort.create({
			tagGroupId: form.data.tagGroupId,
			orderOfTagIds: form.data.orderOfTagIds
		});
	}
};
