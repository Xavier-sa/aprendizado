import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".md": "text/markdown", ".svg": "image/svg+xml" };
createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safePath === "/" ? "index.html" : safePath);
  if (!file.startsWith(root) || !existsSync(file)) { response.writeHead(404); response.end("Não encontrado"); return; }
  if (statSync(file).isDirectory()) file = join(file, "index.html");
  response.setHeader("Content-Type", `${types[extname(file)] || "application/octet-stream"}; charset=utf-8`);
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`WX Academy: http://localhost:${port}`));
