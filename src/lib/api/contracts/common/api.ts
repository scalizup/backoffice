import axios from 'axios';

class Api {
	private headers: Record<string, string> = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	get axiosInstance() {
		return axios.create({
			baseURL: 'http://localhost:5109/api/',
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
