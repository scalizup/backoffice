import api from '../../common/api';
import type { PaginatedData } from '../../common/paginated_data';
import paths from '../../common/paths';

type PaginatedRequest = {
	pageNumber: number;
	pageSize: number;
};

type GetAllTagGroupsWithTagsRequest = PaginatedRequest;

type TagGroup = {
	id: number;
	name: string;
	tags: Tag[];
};

type Tag = {
	id: number;
	name: string;
};

export type GetTagGroupsWithTagsResponse = PaginatedData<TagGroup>;

export const getAllTagGroupsWithTags = async (
	request: GetAllTagGroupsWithTagsRequest
): Promise<GetTagGroupsWithTagsResponse> => {
	const response = await api.get(`/TagGroup/tags`, {
		params: request
	});

	return response.data;
};
