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
	id: number;
	name?: string | null;
}

export interface UpdateTagGroupCommand {
	/** @format int32 */
	id: number;
	name?: string | null;
}

export interface UpdateTenantCommand {
	/** @format int32 */
	id: number;
	name?: string | null;
	isActive?: boolean | null;
}
