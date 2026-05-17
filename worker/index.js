const POSTHOG_UPSTREAM = 'https://eu.i.posthog.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/ingest' || url.pathname.startsWith('/ingest/')) {
      return proxyPostHog(request, url);
    }

    return env.ASSETS.fetch(request);
  },
};

async function proxyPostHog(request, url) {
  const upstreamPath = url.pathname.replace(/^\/ingest(?=\/|$)/, '') || '/';
  const upstreamUrl = new URL(upstreamPath, POSTHOG_UPSTREAM);
  upstreamUrl.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete('authorization');
  headers.delete('cookie');
  headers.delete('host');
  headers.delete('origin');
  headers.delete('referer');
  headers.delete('x-forwarded-host');

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    redirect: 'follow',
  });

  const responseHeaders = new Headers(upstreamResponse.headers);
  responseHeaders.delete('set-cookie');

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}
