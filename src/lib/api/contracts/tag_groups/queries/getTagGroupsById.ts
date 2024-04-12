import axios from '../../common/api';

type GetTagGroupByIdRequest = {
	id: number;
};

type GetTagGroupByIdResponse = {
	id: number;
	name: string;
};

export const getTagGroupById = async (
	request: GetTagGroupByIdRequest
): Promise<GetTagGroupByIdResponse> => {
	const response = await axios.get(`${paths.tagGroups}/${request.id}`);

	return response.data;
};
