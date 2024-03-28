import { redirect } from '@sveltejs/kit';
import { Api } from './myApi';

const { api } = new Api({
	baseUrl: 'http://localhost:5109'
});

const redirectIfNoItems = (response: { currentPage: number; items: any[] }, url: string) => {
	if (response.items.length === 0 && response.currentPage !== 1) {
		redirect(302, url + '?page=' + (response.currentPage - 1));
	}
};

export { api, redirectIfNoItems };
