import axios from 'axios';
import TagGroupsClient from './clients/tag_groups';
import clients from './clients';
import type TagsClient from './clients/tags';
import type ProductsClient from './clients/products';

class Api {
	private headers: Record<string, string> = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	get basePath() {
		return 'localhost:5109';
	}

	get tenants() {
		return clients.tenants;
	}

	get tagGroups(): TagGroupsClient {
		return clients.tagGroups;
	}

	get tags(): TagsClient {
		return clients.tags;
	}

	get products(): ProductsClient {
		return clients.products;
	}

	get auth() {
		return clients.auth;
	}

	get axiosInstance() {
		return axios.create({
			baseURL: `http://${this.basePath}/api/`,
			headers: this.headers,
			withCredentials: true
		});
	}

	get get() {
		return this.axiosInstance.get;
	}

	get post() {
		return this.axiosInstance.post;
	}

	get delete() {
		return this.axiosInstance.delete;
	}

	get patch() {
		return this.axiosInstance.patch;
	}

	get put() {
		return this.axiosInstance.put;
	}

	setAuthorization(token: string, refreshToken: string): void {
		this.headers.Authorization = token;
		this.headers.RefreshToken = refreshToken;
	}
}

const api = new Api();

export default api;
