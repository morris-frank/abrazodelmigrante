const STATE_COOKIE = 'decap_oauth_state';

function buildHeaders(extraHeaders = {}) {
	return {
		'Cache-Control': 'no-store',
		...extraHeaders,
	};
}

function parseCookies(cookieHeader = '') {
	return cookieHeader
		.split(';')
		.map((cookie) => cookie.trim())
		.filter(Boolean)
		.reduce((allCookies, cookie) => {
			const separatorIndex = cookie.indexOf('=');
			if (separatorIndex === -1) {
				return allCookies;
			}

			const key = cookie.slice(0, separatorIndex).trim();
			const value = cookie.slice(separatorIndex + 1).trim();
			allCookies[key] = decodeURIComponent(value);
			return allCookies;
		}, {});
}

function clearCookie(name) {
	return `${name}=; Max-Age=0; Path=/api; HttpOnly; Secure; SameSite=Lax`;
}

function renderResponse(status, content) {
	const payload = JSON.stringify(content);
	const message = `authorization:github:${status}:${payload}`;

	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Abrazo del migrante CMS</title>
		<style>
			body {
				margin: 0;
				display: grid;
				place-items: center;
				min-height: 100vh;
				font-family: Manrope, system-ui, sans-serif;
				background: #f6efe3;
				color: #211915;
			}

			.card {
				max-width: 30rem;
				padding: 1.5rem;
				border-radius: 1.5rem;
				background: rgba(255, 251, 245, 0.92);
				box-shadow: 0 18px 45px rgba(54, 33, 24, 0.12);
				text-align: center;
			}
		</style>
	</head>
	<body>
		<div class="card">
			<p>Connecting GitHub with the editor. This window will close automatically.</p>
		</div>
		<script>
			(function () {
				if (!window.opener) {
					return;
				}

				function receiveMessage(event) {
					window.opener.postMessage(${JSON.stringify(message)}, event.origin);
					window.removeEventListener('message', receiveMessage, false);
					window.setTimeout(function () {
						window.close();
					}, 120);
				}

				window.addEventListener('message', receiveMessage, false);
				window.opener.postMessage('authorizing:github', '*');
			})();
		</script>
	</body>
</html>`;
}

export async function onRequestGet({ request, env }) {
	if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
		return new Response(renderResponse('error', { error: 'server_error', error_description: 'Missing GitHub OAuth secrets.' }), {
			status: 500,
			headers: buildHeaders({
				'Content-Type': 'text/html; charset=utf-8',
				'Set-Cookie': clearCookie(STATE_COOKIE),
			}),
		});
	}

	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const returnedState = url.searchParams.get('state');
	const cookies = parseCookies(request.headers.get('cookie'));
	const storedState = cookies[STATE_COOKIE];

	if (!code || !returnedState || !storedState || returnedState !== storedState) {
		return new Response(
			renderResponse('error', {
				error: 'access_denied',
				error_description: 'The GitHub login state did not match. Please try again.',
			}),
			{
				status: 401,
				headers: buildHeaders({
					'Content-Type': 'text/html; charset=utf-8',
					'Set-Cookie': clearCookie(STATE_COOKIE),
				}),
			},
		);
	}

	const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'User-Agent': 'abrazodelmigrante-decap-oauth',
		},
		body: JSON.stringify({
			client_id: env.GITHUB_OAUTH_CLIENT_ID,
			client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
			code,
			redirect_uri: `${url.origin}/api/callback`,
			state: returnedState,
		}),
	});

	const result = await tokenResponse.json();

	if (!tokenResponse.ok || result.error || !result.access_token) {
		return new Response(renderResponse('error', result), {
			status: 401,
			headers: buildHeaders({
				'Content-Type': 'text/html; charset=utf-8',
				'Set-Cookie': clearCookie(STATE_COOKIE),
			}),
		});
	}

	return new Response(
		renderResponse('success', {
			token: result.access_token,
			provider: 'github',
		}),
		{
			status: 200,
			headers: buildHeaders({
				'Content-Type': 'text/html; charset=utf-8',
				'Set-Cookie': clearCookie(STATE_COOKIE),
			}),
		},
	);
}

export const onRequest = onRequestGet;
