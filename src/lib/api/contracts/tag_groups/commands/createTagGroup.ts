import axios from '../../common/api';
import paths from '../../common/paths';

type CreateTagGroupRequest = {
	name: string;
};

type CreateTagGroupResponse = number;

export const createTagGroup = async (
	request: CreateTagGroupRequest
): Promise<CreateTagGroupResponse> => {
	const response = await axios.post(paths.tagGroups, request);

	return response.data;
};
