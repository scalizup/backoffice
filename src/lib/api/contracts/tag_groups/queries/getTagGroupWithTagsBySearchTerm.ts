import axios from '../../common/api';
import paths from '../../common/paths';

export type GetTagGroupWithTagsBySearchTermResponse = {
	id: number;
	name: string;
	tags: Tag[];
}[];

type Tag = {
	id: number;
	name: string;
};

export const getTagGroupWithTagsBySearchTerm = async (
	searchTerm: string
): Promise<GetTagGroupWithTagsBySearchTermResponse> => {
	const response = await axios.get(`taggroup/tags/${searchTerm}`);

	return response.data;
};
