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
import type {
	CreateTagCommand,
	CreateTagGroupCommand,
	CreateTenantCommand,
	GetAllTagGroupsPaginated,
	GetAllTagsPaginated,
	GetAllTenantsPaginated,
	GetTagGroupByIdTagGroupDto,
	GetTenantByIdTenantDto,
	MicrosoftAspNetCoreMvcProblemDetails,
	UpdateTagCommand,
	UpdateTagGroupCommand,
	UpdateTenantCommand
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @tags Tag
	 * @name PostApi
	 * @request POST:/api/Tag
	 */
	postApi = (data: CreateTagCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tag`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tag
	 * @name GetApi
	 * @request GET:/api/Tag
	 */
	getApi = (
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
		this.request<GetAllTagsPaginated, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tag`,
			method: 'GET',
			query: query,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tag
	 * @name PatchApi
	 * @request PATCH:/api/Tag
	 */
	patchApi = (data: UpdateTagCommand, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tag`,
			method: 'PATCH',
			body: data,
			type: ContentType.Json,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tag
	 * @name DeleteApi
	 * @request DELETE:/api/Tag/{id}
	 */
	deleteApi = (id: number, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tag/${id}`,
			method: 'DELETE',
			...params
		});
	/**
	 * No description
	 *
	 * @tags TagGroup
	 * @name TagGroupCreate
	 * @request POST:/api/TagGroup
	 */
	tagGroupCreate = (data: CreateTagGroupCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/TagGroup`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags TagGroup
	 * @name TagGroupList
	 * @request GET:/api/TagGroup
	 */
	tagGroupList = (
		query?: {
			/** @format int32 */
			PageNumber?: number;
			/** @format int32 */
			PageSize?: number;
			/** @format int32 */
			tenantId?: number;
		},
		params: RequestParams = {}
	) =>
		this.request<GetAllTagGroupsPaginated, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/TagGroup`,
			method: 'GET',
			query: query,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags TagGroup
	 * @name TagGroupPartialUpdate
	 * @request PATCH:/api/TagGroup
	 */
	tagGroupPartialUpdate = (data: UpdateTagGroupCommand, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/TagGroup`,
			method: 'PATCH',
			body: data,
			type: ContentType.Json,
			...params
		});
	/**
	 * No description
	 *
	 * @tags TagGroup
	 * @name TagGroupDetail
	 * @request GET:/api/TagGroup/{id}
	 */
	tagGroupDetail = (id: number, params: RequestParams = {}) =>
		this.request<GetTagGroupByIdTagGroupDto, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/TagGroup/${id}`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags TagGroup
	 * @name TagGroupDelete
	 * @request DELETE:/api/TagGroup/{id}
	 */
	tagGroupDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/TagGroup/${id}`,
			method: 'DELETE',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tenant
	 * @name TenantCreate
	 * @request POST:/api/Tenant
	 */
	tenantCreate = (data: CreateTenantCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tenant`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tenant
	 * @name TenantList
	 * @request GET:/api/Tenant
	 */
	tenantList = (
		query?: {
			/** @format int32 */
			PageNumber?: number;
			/** @format int32 */
			PageSize?: number;
		},
		params: RequestParams = {}
	) =>
		this.request<GetAllTenantsPaginated, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tenant`,
			method: 'GET',
			query: query,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tenant
	 * @name TenantPartialUpdate
	 * @request PATCH:/api/Tenant
	 */
	tenantPartialUpdate = (data: UpdateTenantCommand, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tenant`,
			method: 'PATCH',
			body: data,
			type: ContentType.Json,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tenant
	 * @name TenantDetail
	 * @request GET:/api/Tenant/{id}
	 */
	tenantDetail = (id: number, params: RequestParams = {}) =>
		this.request<GetTenantByIdTenantDto, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tenant/${id}`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Tenant
	 * @name TenantDelete
	 * @request DELETE:/api/Tenant/{id}
	 */
	tenantDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Tenant/${id}`,
			method: 'DELETE',
			...params
		});
}
