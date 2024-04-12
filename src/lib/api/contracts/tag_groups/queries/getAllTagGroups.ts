import type { PaginatedData } from '../../common/paginated_data';
import api from '../../common/api';
import paths from '../../common/paths';

type GetAllTagGroupsRequest = {
	id: number;
};

type TagGroup = {
	id: number;
	name: string;
};

type GetTagGroupsResponse = PaginatedData<TagGroup>;

export const getAllTagGroups = async (
	request: GetAllTagGroupsRequest
): Promise<GetTagGroupsResponse> => {
	const response = await api.get(paths.tagGroups, {
		params: request
	});

	return response.data;
};
