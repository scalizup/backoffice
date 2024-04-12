import api from '../../common/api';
import paths from '../../common/paths';

interface DeleteTagGroupRequest {
	id: string;
}

export const deleteTagGroup = async (request: DeleteTagGroupRequest): Promise<void> => {
	await api.delete(`${paths.tagGroups}/${request.id}`);
};
