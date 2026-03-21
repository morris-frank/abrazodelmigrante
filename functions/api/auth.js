const STATE_COOKIE = 'decap_oauth_state';
const TEN_MINUTES = 60 * 10;

function buildHeaders(extraHeaders = {}) {
	return {
		'Cache-Control': 'no-store',
		...extraHeaders,
	};
}

function createState() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

function serializeCookie(name, value, maxAge) {
	return `${name}=${value}; Max-Age=${maxAge}; Path=/api; HttpOnly; Secure; SameSite=Lax`;
}

export async function onRequestGet({ request, env }) {
	if (!env.GITHUB_OAUTH_CLIENT_ID) {
		return new Response('Missing GITHUB_OAUTH_CLIENT_ID secret.', {
			status: 500,
			headers: buildHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
		});
	}

	const url = new URL(request.url);
	const redirectUrl = new URL('https://github.com/login/oauth/authorize');
	const state = createState();

	redirectUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
	redirectUrl.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
	redirectUrl.searchParams.set('scope', env.GITHUB_OAUTH_SCOPE || 'repo user');
	redirectUrl.searchParams.set('state', state);

	return new Response(null, {
		status: 302,
		headers: buildHeaders({
			Location: redirectUrl.toString(),
			'Set-Cookie': serializeCookie(STATE_COOKIE, state, TEN_MINUTES),
		}),
	});
}

export const onRequest = onRequestGet;
