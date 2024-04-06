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

import {
	AddUserToRoleCommand,
	AddUserToTenantCommand,
	CreateRoleCommand,
	CreateTagCommand,
	CreateTagGroupCommand,
	CreateTenantCommand,
	DomainEntitiesRole,
	DomainEntitiesUser,
	GetAllTagGroupsPaginated,
	GetAllTagsPaginated,
	GetAllTenantsPaginated,
	GetTagGroupByIdTagGroupDto,
	GetTenantByIdTenantDto,
	LoginUserCommand,
	MicrosoftAspNetCoreMvcProblemDetails,
	RefreshUserTokenCommand,
	RegisterUserCommand,
	UpdateTagCommand,
	UpdateTagGroupCommand,
	UpdateTenantCommand
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @tags Admin
	 * @name AdminCreateRoleCreate
	 * @request POST:/api/Admin/create-role
	 */
	adminCreateRoleCreate = (data: CreateRoleCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Admin/create-role`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Admin
	 * @name AdminAddUserToRoleCreate
	 * @request POST:/api/Admin/add-user-to-role
	 */
	adminAddUserToRoleCreate = (data: AddUserToRoleCommand, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Admin/add-user-to-role`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Admin
	 * @name AdminAddUserToTenantCreate
	 * @request POST:/api/Admin/add-user-to-tenant
	 */
	adminAddUserToTenantCreate = (data: AddUserToTenantCommand, params: RequestParams = {}) =>
		this.request<void, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Admin/add-user-to-tenant`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Admin
	 * @name AdminGetAllRolesList
	 * @request GET:/api/Admin/get-all-roles
	 */
	adminGetAllRolesList = (params: RequestParams = {}) =>
		this.request<DomainEntitiesRole[], MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Admin/get-all-roles`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Admin
	 * @name AdminGetAllUsersList
	 * @request GET:/api/Admin/get-all-users
	 */
	adminGetAllUsersList = (params: RequestParams = {}) =>
		this.request<DomainEntitiesUser[], MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Admin/get-all-users`,
			method: 'GET',
			format: 'json',
			...params
		});
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
	/**
	 * No description
	 *
	 * @tags Users
	 * @name UsersRegisterCreate
	 * @request POST:/api/Users/register
	 */
	usersRegisterCreate = (data: RegisterUserCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Users/register`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Users
	 * @name UsersLoginCreate
	 * @request POST:/api/Users/login
	 */
	usersLoginCreate = (data: LoginUserCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Users/login`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Users
	 * @name UsersRefreshCreate
	 * @request POST:/api/Users/refresh
	 */
	usersRefreshCreate = (data: RefreshUserTokenCommand, params: RequestParams = {}) =>
		this.request<number, MicrosoftAspNetCoreMvcProblemDetails>({
			path: `/api/Users/refresh`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
}
