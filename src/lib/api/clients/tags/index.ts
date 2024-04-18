import * as api from '$lib/api';

type Tag = {
	id: number;
	name: string;
};

export default class TagsClient {
	private readonly path = '/tags';

	async getById(id: number): Promise<Tag> {
		const response = await api.client.get(`${this.path}/${id}`);

		return response.data;
	}

	async getAll(
		data: api.PaginatedRequest & { tagGroupId: number }
	): Promise<api.PaginatedData<Tag>> {
		const response = await api.client.get(this.path, {
			params: data
		});

		return response.data;
	}

	async post(data: { tagGroupId: number; name: string }): Promise<{ id: number }> {
		const response = await api.client.post(this.path, data);

		return response.data;
	}

	async patch(data: { id: number; name: string }) {
		await api.client.patch(this.path, data);
	}

	async delete(id: number) {
		await api.client.delete(`${this.path}/${id}`);
	}
}
