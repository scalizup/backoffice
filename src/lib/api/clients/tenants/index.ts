import * as api from '$lib/api';

export interface Tenant {
	id: number;
	name: string;
}

export default class TenantsClient {
	private readonly path = '/tenants';
}
