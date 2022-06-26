import { serve } from "https://deno.land/std@0.145.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.145.0/http/file_server.ts";

const servePage = async (html: string) => {
  try {
    const pageContents = new TextDecoder().decode(await Deno.readFile(`pages/${html}`));
    return new Response(pageContents, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch {
    return new Response('', {status: 400});
  }
}

const log = (msg: string) => {
  console.log(`${(new Date()).toISOString()} ${msg}`);
};

const handler = (req: Request) => {
  const url = new URL(req.url);
  if (req.method === 'GET') {
    if (url.pathname === '/') {
      return servePage('index.html')
    } else if (url.pathname === '/alchat') {
      return servePage('alchat.html')
    } else if (url.pathname === '/data') {
      log("Jump to 8080 port");
    } else if (url.pathname === '/favicon.ico') {
      return serveFile(req, 'yunofly.ico');
    } else if (url.pathname.startsWith('/static')) {
      const fileName = url.pathname.substring('/static/'.length);
      return serveFile(req, 'pages/'+fileName);
    }
  } else if (req.method === 'POST') {
    return new Response('', {status: 200});
  }
  return new Response('You are entering the void!\n', {status: 404});

};

const port = 2220;
log(`http://localhost:${port}/`)

await serve(handler, { port });

