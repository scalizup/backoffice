import api from '../../common/api';
import paths from '../../common/paths';

type UpdateTagGroupRequest = {
	id: number;
	name: string;
};

export const updateTagGroup = async (request: UpdateTagGroupRequest): Promise<void> => {
	await api.put(`${paths.tagGroups}/${request.id}`, request);
};
