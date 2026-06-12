interface CloudflareContext {
  request: Request;
  params: {
    path?: string[];
  };
}

const POSTHOG_UPSTREAM = 'https://eu.i.posthog.com';

export const onRequest = async (context: CloudflareContext): Promise<Response> => {
  const { request, params } = context;
  const url = new URL(request.url);

  const pathSegments = Array.isArray(params.path) ? params.path : [];
  const upstreamPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/';
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
};
