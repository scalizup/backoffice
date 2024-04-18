import api from '$lib/api/api';
import paths from '$lib/api/utils/paths';
import { setAuthorizationCookies } from '$lib/helpers/setAuthorizationCookies';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const unProtectedRoutes: string[] = [paths.auth.signIn];

const parseJwt = (token: string) => {
	token = token.replace('Bearer ', '');

	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.accessToken = event.cookies.get('Authorization') as string;
	event.locals.refreshToken = event.cookies.get('RefreshToken') as string;

	const isLoggedIn = event.locals.accessToken != null && event.locals.refreshToken != null;
	const isPublicPath = unProtectedRoutes.includes(event.url.pathname);
	if (!isLoggedIn && !isPublicPath) {
		return redirect(303, paths.auth.signIn);
	}

	if (isLoggedIn) {
		await validateAndUpdateTokens(event);

		api.setAuthorization(event.locals.accessToken, event.locals.refreshToken);

		if (isPublicPath) {
			return redirect(303, paths.tagGroups);
		}
	}

	return await resolve(event);
};

const validateAndUpdateTokens = async (event: RequestEvent) => {
	const accessTokenTime = parseJwt(event.locals.accessToken!).exp;

	if (accessTokenTime && accessTokenTime < Date.now() / 1000) {
		const { accessToken, refreshToken } = await api.auth.refreshTokens({
			accessToken: event.locals.accessToken!,
			refreshToken: event.locals.refreshToken!
		});

		event.locals.accessToken = accessToken;
		event.locals.refreshToken = refreshToken;

		setAuthorizationCookies(event, accessToken, refreshToken);
	}
};
