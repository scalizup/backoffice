/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateTagCommand {
	/** @format int32 */
	tenantId: number;
	/** @format int32 */
	tagGroupId: number;
	name: string;
}

export interface CreateTagGroupCommand {
	/** @format int32 */
	tenantId: number;
	name: string;
}

export interface CreateTenantCommand {
	name: string;
}

export interface GetAllTagGroupsTagGroupDto {
	/** @format int32 */
	id: number;
	name: string;
}

export interface GetAllTagGroupsTagGroupDtoDomainVersion1000CultureNeutralPublicKeyTokenNull {
	/** @format int32 */
	currentPage: number;
	/** @format int32 */
	pageSize: number;
	/** @format int32 */
	totalItems: number;
	/** @format int32 */
	totalPages: number;
	items: GetAllTagGroupsTagGroupDto[];
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface GetAllTagsTagDto {
	/** @format int32 */
	id: number;
	name: string;
}

export interface GetAllTagsTagDtoDomainVersion1000CultureNeutralPublicKeyTokenNull {
	/** @format int32 */
	currentPage: number;
	/** @format int32 */
	pageSize: number;
	/** @format int32 */
	totalItems: number;
	/** @format int32 */
	totalPages: number;
	items: GetAllTagsTagDto[];
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface GetAllTenantsTenantDto {
	/** @format int32 */
	id: number;
	name: string;
	isActive: boolean;
}

export interface GetAllTenantsTenantDtoDomainVersion1000CultureNeutralPublicKeyTokenNull {
	/** @format int32 */
	currentPage: number;
	/** @format int32 */
	pageSize: number;
	/** @format int32 */
	totalItems: number;
	/** @format int32 */
	totalPages: number;
	items: GetAllTenantsTenantDto[];
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface GetTenantByIdTenantDto {
	/** @format int32 */
	id: number;
	name: string;
	isActive: boolean;
}

export interface MicrosoftAspNetCoreMvcProblemDetails {
	type: string | null;
	title: string | null;
	/** @format int32 */
	status: number | null;
	detail: string | null;
	instance: string | null;
	[key: string]: any;
}

export interface UpdateTagCommand {
	/** @format int32 */
	id?: number;
	name?: string | null;
}

export interface UpdateTagGroupCommand {
	/** @format int32 */
	id?: number;
	name?: string | null;
}

export interface UpdateTenantCommand {
	/** @format int32 */
	id?: number;
	name?: string | null;
	isActive?: boolean | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
							? JSON.stringify(property)
							: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
				},
				signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
				body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
			}
		).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title Presentation.API
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags Tag
		 * @name PostApi
		 * @request POST:/api/Tag
		 */
		postApi: (data: CreateTagCommand, params: RequestParams = {}) =>
			this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tag`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tag
		 * @name GetApi
		 * @request GET:/api/Tag
		 */
		getApi: (
			query?: {
				/** @format int32 */
				PageNumber?: number;
				/** @format int32 */
				PageSize?: number;
				/** @format int32 */
				tagGroupId?: number;
			},
			params: RequestParams = {}
		) =>
			this.request<
				GetAllTagsTagDtoDomainVersion1000CultureNeutralPublicKeyTokenNull,
				MicrosoftAspNetCoreMvcProblemDetails
			>({
				path: `/api/Tag`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tag
		 * @name PatchApi
		 * @request PATCH:/api/Tag
		 */
		patchApi: (data: UpdateTagCommand, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tag`,
				method: 'PATCH',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tag
		 * @name DeleteApi
		 * @request DELETE:/api/Tag/{id}
		 */
		deleteApi: (id: number, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tag/${id}`,
				method: 'DELETE',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags TagGroup
		 * @name TagGroupCreate
		 * @request POST:/api/TagGroup
		 */
		tagGroupCreate: (data: CreateTagGroupCommand, params: RequestParams = {}) =>
			this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/TagGroup`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags TagGroup
		 * @name TagGroupList
		 * @request GET:/api/TagGroup
		 */
		tagGroupList: (
			query: {
				/** @format int32 */
				PageNumber: number;
				/** @format int32 */
				PageSize: number;
				/** @format int32 */
				tenantId: number;
			},
			params: RequestParams = {}
		) =>
			this.request<
				GetAllTagGroupsTagGroupDtoDomainVersion1000CultureNeutralPublicKeyTokenNull,
				MicrosoftAspNetCoreMvcProblemDetails
			>({
				path: `/api/TagGroup`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags TagGroup
		 * @name TagGroupPartialUpdate
		 * @request PATCH:/api/TagGroup
		 */
		tagGroupPartialUpdate: (data: UpdateTagGroupCommand, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/TagGroup`,
				method: 'PATCH',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags TagGroup
		 * @name TagGroupDelete
		 * @request DELETE:/api/TagGroup/{id}
		 */
		tagGroupDelete: (id: number, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/TagGroup/${id}`,
				method: 'DELETE',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tenant
		 * @name TenantCreate
		 * @request POST:/api/Tenant
		 */
		tenantCreate: (data: CreateTenantCommand, params: RequestParams = {}) =>
			this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tenant`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tenant
		 * @name TenantList
		 * @request GET:/api/Tenant
		 */
		tenantList: (
			query: {
				/** @format int32 */
				PageNumber: number;
				/** @format int32 */
				PageSize: number;
			},
			params: RequestParams = {}
		) =>
			this.request<
				GetAllTenantsTenantDtoDomainVersion1000CultureNeutralPublicKeyTokenNull,
				MicrosoftAspNetCoreMvcProblemDetails
			>({
				path: `/api/Tenant`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tenant
		 * @name TenantPartialUpdate
		 * @request PATCH:/api/Tenant
		 */
		tenantPartialUpdate: (data: UpdateTenantCommand, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tenant`,
				method: 'PATCH',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tenant
		 * @name TenantDetail
		 * @request GET:/api/Tenant/{id}
		 */
		tenantDetail: (id: number, params: RequestParams = {}) =>
			this.request<GetTenantByIdTenantDto, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tenant/${id}`,
				method: 'GET',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Tenant
		 * @name TenantDelete
		 * @request DELETE:/api/Tenant/{id}
		 */
		tenantDelete: (id: number, params: RequestParams = {}) =>
			this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
				path: `/api/Tenant/${id}`,
				method: 'DELETE',
				...params
			})
	};
}
