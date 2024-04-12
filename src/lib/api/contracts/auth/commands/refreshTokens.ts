import axios from '../../common/api';
import paths from '../../common/paths';

type RefreshTokensRequest = {
	accessToken: string;
	refreshToken: string;
};

type RefreshTokensResponse = {
	accessToken: string;
	refreshToken: string;
};

export const refreshTokens = async (
	request: RefreshTokensRequest
): Promise<RefreshTokensResponse> => {
	const response = await axios.post('/users/refresh', request);

	return response.data;
};
