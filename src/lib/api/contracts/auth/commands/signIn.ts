import axios from '../../common/api';
import paths from '../../common/paths';

type SignInRequest = {
	username: string;
	password: string;
};

type SignInResponse = {
	accessToken: string;
	refreshToken: string;
};

export const signIn = async (request: SignInRequest): Promise<SignInResponse> => {
	const response = await axios.post('/users/login', request);

	return response.data;
};
