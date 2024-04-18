import * as api from '$lib/api';

interface Tag {
	id: number;
	name: string;
}

export interface TagGroup {
	id: number;
	name: string;
	tags: Tag[];
}

export default class TagGroupsClient {
	private readonly path = '/taggroups';

	async getBySearchTerm(searchTerm: string): Promise<TagGroup[]> {
		const response = await api.client.get(`${this.path}/search/${searchTerm}`, {
			params: {
				searchTerm
			}
		});

		return response.data;
	}

	async getById(id: number): Promise<TagGroup> {
		const response = await api.client.get(`${this.path}/${id}`);

		return response.data;
	}

	async getAll(data: api.PaginatedRequest): Promise<api.PaginatedData<TagGroup>> {
		const response = await api.client.get(this.path, {
			params: data
		});

		return response.data;
	}

	async getAllWithTags(data: api.PaginatedRequest): Promise<api.PaginatedData<TagGroup>> {
		const response = await api.client.get(`${this.path}/tags`, {
			params: data
		});

		return response.data;
	}

	async post(data: { name: string }): Promise<{ id: number }> {
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
