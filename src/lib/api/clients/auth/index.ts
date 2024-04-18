import * as api from '$lib/api';

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

interface GetMeDto {
	username: string;
	tenant: {
		id: number;
		name: string;
	};
}

export default class AuthClient {
	private readonly path = '/users';

	async refreshTokens(data: Tokens): Promise<Tokens> {
		data.accessToken = data.accessToken.replace('Bearer ', '');

		const response = await api.client.post(`${this.path}/refresh`, {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken
		});

		return {
			accessToken: `Bearer ${response.data.accessToken}`,
			refreshToken: response.data.refreshToken
		};
	}

	async login(data: { username: string; password: string }): Promise<Tokens> {
		const response = await api.client.post(`${this.path}/login`, data);

		return {
			accessToken: `Bearer ${response.data.accessToken}`,
			refreshToken: response.data.refreshToken
		};
	}

	async logout(): Promise<void> {
		await api.client.post(`${this.path}/logout`);
	}

	async getMe(): Promise<GetMeDto> {
		const response = await api.client.get(`${this.path}/me`);

		return response.data;
	}
}
