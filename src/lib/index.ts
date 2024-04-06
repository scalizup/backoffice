import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { Api } from './Api';

const api = new Api({
	baseUrl: 'http://localhost:5109'
});

const redirectIfNoItems = (response: { currentPage: number; items: any[] }, url: string) => {
	if (response.items.length === 0 && response.currentPage !== 1) {
		redirect(302, url + '?page=' + (response.currentPage - 1));
	}
};

const getTagGroupId = async (params: { tagGroupId: string }) => {
	const validationSchema = z.object({
		tagGroupId: z.coerce.number().gt(0)
	});

	const result = await validationSchema.parseAsync(params);

	return result.tagGroupId;
};

export { api, redirectIfNoItems, getTagGroupId };
