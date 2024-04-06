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

export interface AddUserToRoleCommand {
	/** @format int32 */
	userId?: number;
	name?: string;
}

export interface AddUserToTenantCommand {
	/** @format int32 */
	userId?: number;
	/** @format int32 */
	tenantId?: number;
}

export interface ApplicationCommonInterfacesIUser {
	/** @format int32 */
	id?: number | null;
	requestIp?: string;
	refreshToken?: string;
}

export interface CreateRoleCommand {
	name?: string;
}

export interface CreateTagCommand {
	user?: ApplicationCommonInterfacesIUser;
	/** @format int32 */
	tenantId?: number;
	/** @format int32 */
	tagGroupId?: number;
	name?: string;
}

export interface CreateTagGroupCommand {
	user?: ApplicationCommonInterfacesIUser;
	/** @format int32 */
	tenantId?: number;
	name?: string;
}

export interface CreateTenantCommand {
	name?: string;
}

export interface DomainEntitiesRole {
	/** @format int32 */
	id?: number;
	name?: string;
	users?: DomainEntitiesUser[];
}

export interface DomainEntitiesTag {
	/** @format int32 */
	id?: number;
	/** @format int32 */
	tenantId?: number;
	name?: string;
	/** @format int32 */
	tagGroupId?: number;
	tagGroup?: DomainEntitiesTagGroup;
}

export interface DomainEntitiesTagGroup {
	/** @format int32 */
	id?: number;
	/** @format int32 */
	tenantId?: number;
	name?: string;
	tags?: DomainEntitiesTag[];
}

export interface DomainEntitiesTenant {
	/** @format int32 */
	id?: number;
	name?: string;
	isActive?: boolean;
	tagGroups?: DomainEntitiesTagGroup[];
	users?: DomainEntitiesUser[];
}

export interface DomainEntitiesUser {
	/** @format int32 */
	id?: number;
	username?: string;
	password?: string;
	roles?: DomainEntitiesRole[];
	availableTenants?: DomainEntitiesTenant[];
}

export interface GetAllTagGroupsPaginated {
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

export interface GetAllTagGroupsTagGroupDto {
	/** @format int32 */
	id: number;
	name: string;
}

export interface GetAllTagsPaginated {
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

export interface GetAllTagsTagDto {
	/** @format int32 */
	id: number;
	name: string;
}

export interface GetAllTenantsPaginated {
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

export interface GetAllTenantsTenantDto {
	/** @format int32 */
	id: number;
	name: string;
	isActive: boolean;
}

export interface GetTagGroupByIdTagGroupDto {
	/** @format int32 */
	id: number;
	name: string;
}

export interface GetTenantByIdTenantDto {
	/** @format int32 */
	id: number;
	name: string;
	isActive: boolean;
}

export interface LoginUserCommand {
	username: string;
	password: string;
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

export interface RefreshUserTokenCommand {
	accessToken: string;
	refreshToken: string;
}

export interface RegisterUserCommand {
	username?: string;
	password?: string;
}

export interface UpdateTagCommand {
	user?: ApplicationCommonInterfacesIUser;
	/** @format int32 */
	tenantId?: number;
	/** @format int32 */
	id?: number;
	name?: string | null;
}

export interface UpdateTagGroupCommand {
	user?: ApplicationCommonInterfacesIUser;
	/** @format int32 */
	tenantId?: number;
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
