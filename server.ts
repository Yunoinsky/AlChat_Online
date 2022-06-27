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

const handler = async (req: Request) => {
  const url = new URL(req.url);
  if (req.method === 'GET') {                                     // GET
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
    } else if (url.pathname.startsWith('/download')) {
      // const fileName = url.pathname.substring('/filedownload/'.length);
    }
  } else if (req.method === 'POST') {
    if (url.pathname.startsWith('/download')) {
      try {
        const body = await req.formData();
        const dType = body.get('downloadType')
        const fn = body.get('fileName')
        if (dType ==='emb') {
          log(`Downloading ${body.get('fileName')} ${body.get('downloadType')}`)
          const fpath = `../AlChat/data/embedding/${fn}_embedding.json`;
          return serveFile(req, fpath);
        }
      } catch {
        return new Response('', { status: 400 });
      }
      
      return new Response('', {status: 200});
    }
  }
  return new Response('You are entering the void!\n', {status: 404});

};

const port = parseInt(Deno.args[0]);
log(`http://localhost:${port}/`)

await serve(handler, { port });

