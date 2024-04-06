import { api } from '$lib';
import { redirect, type Handle } from '@sveltejs/kit';

const unProtectedRoutes: string[] = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];

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

	const isPublicPath = unProtectedRoutes.includes(event.url.pathname);
	const isLoggedIn = event.locals.accessToken && event.locals.refreshToken;

	if (!isLoggedIn && !isPublicPath) {
		return redirect(303, '/sign-in');
	}

	if (isLoggedIn) {
		if (isPublicPath) {
			return redirect(303, '/tag-groups');
		}

		const accessTokenTime = parseJwt(event.locals.accessToken).exp;
		if (accessTokenTime && accessTokenTime < Date.now() / 1000) {
			try {
				const refreshTokens = await api.usersRefreshCreate({
					accessToken: event.locals.accessToken,
					refreshToken: event.locals.refreshToken
				});

				event.locals.accessToken = refreshTokens.accessToken;
				event.locals.refreshToken = refreshTokens.refreshToken;

				event.cookies.set('Authorization', `Bearer ${refreshTokens.accessToken}`, {
					path: '/'
				});
				event.cookies.set('RefreshToken', refreshTokens.refreshToken, {
					path: '/'
				});

				if (!isPublicPath) {
					return redirect(303, '/tag-groups');
				}
			} catch (error) {
				event.cookies.delete('Authorization', {
					path: '/'
				});

				event.cookies.delete('RefreshToken', {
					path: '/'
				});

				return redirect(303, '/sign-in');
			}
		}
	}

	return await resolve(event);
};
