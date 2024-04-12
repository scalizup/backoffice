import type { RequestEvent } from '@sveltejs/kit';

export const setAuthorizationCookies = async (
	event: RequestEvent,
	accessToken: string,
	refreshToken: string
) => {
	event.cookies.set('Authorization', `Bearer ${accessToken}`, {
		sameSite: 'strict',
		path: '/',
		httpOnly: true
	});

	event.cookies.set('RefreshToken', refreshToken, {
		sameSite: 'strict',
		path: '/',
		httpOnly: true
	});
};
