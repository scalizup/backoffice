import * as api from '$lib/api';

interface ProductCreateRequest {
	name: string;
	description?: string | null | undefined;
	price?: number | null | undefined;
	image?: File | null | undefined;
	tagIds: number[];
}

export interface TagResponse {
	id: number;
	name: string;
}

export interface TagGroupResponse {
	id: number;
	name: string;
	tags: TagResponse[];
}

export interface ProductResponse {
	id: number;
	name: string;
	description: string | null;
	price: number | null;
	imageUrl: string | null;
	tagGroups: TagGroupResponse[];
}

export default class ProductsClient {
	private readonly path = '/products';

	async post(data: ProductCreateRequest): Promise<{ id: number }> {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description || '');
		formData.append('price', data.price?.toString() || '');
		data.tagIds.forEach((tagId, index) => {
			formData.append(`tagIds[${index}]`, tagId.toString());
		});
		if (data.image) {
			formData.append('image', data.image);
		}

		const response = await api.client.post(this.path, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return response.data;
	}

	async patch(id: number, data: ProductCreateRequest) {
		const formData = new FormData();
		formData.append('id', id.toString());

		if (data.name) {
			formData.append('name', data.name || null!);
		}

		if (data.description) {
			formData.append('description', data.description);
		}

		if (data.price) {
			formData.append('price', data.price?.toString() || null!);
		}

		if (data.tagIds && data.tagIds.length !== 0) {
			data.tagIds?.forEach((tagId, index) => {
				formData.append(`tagIds[${index}]`, tagId.toString());
			});
		}

		if (data.image) {
			formData.append('image', data.image);
		}

		const response = await api.client.patch(this.path, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return response.data;
	}

	async getAll(): Promise<api.PaginatedData<ProductResponse>> {
		const response = await api.client.get(this.path, {
			params: {
				PageSize: 50,
				PageNumber: 1
			}
		});

		const responseDataItems = response.data.items.map((item: any) => {
			return {
				id: item.id,
				name: item.name,
				description: item.description,
				price: item.price,
				imageUrl: item.imageUrl && `http://${api.client.basePath}/${item.imageUrl}`,
				tagGroups: item.tagGroups
			};
		});

		return {
			...response.data,
			items: responseDataItems
		};
	}

	async delete(id: number) {
		await api.client.delete(`${this.path}/${id}`);
	}
}
