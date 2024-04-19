import api from '$lib/api/api';

export interface MenuSort {
	tagGroupName: string;
	tags: {
		id: number;
		name: string;
	}[];
}

export default class MenuSortClient {
	private readonly path = '/menusort';

	async create(data: { tagGroupId: number; orderOfTagIds: number[] }): Promise<void> {
		await api.post(this.path, data);
	}

	async get(): Promise<MenuSort> {
		const response = await api.get(this.path);

		return response.data;
	}
}
