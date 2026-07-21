import { serve } from "bun";
import index from "./index.html";
import { join } from "path";

const PUBLIC_DIR = join(import.meta.dir, "../public");

// Cache headers for static assets
const CACHE_IMMUTABLE = "public, max-age=31536000, immutable";
const CACHE_LONG = "public, max-age=86400";
const NO_CACHE = "no-cache, no-store, must-revalidate";

const server = serve({
  routes: {
    // Static files from public/ with cache headers
    "/favicon.svg": new Response(Bun.file(join(PUBLIC_DIR, "favicon.svg")), {
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": CACHE_IMMUTABLE },
    }),
    "/robots.txt": new Response(Bun.file(join(PUBLIC_DIR, "robots.txt")), {
      headers: { "Content-Type": "text/plain", "Cache-Control": CACHE_LONG },
    }),
    "/sitemap.xml": new Response(Bun.file(join(PUBLIC_DIR, "sitemap.xml")), {
      headers: { "Content-Type": "application/xml", "Cache-Control": CACHE_LONG },
    }),
    "/llms.txt": new Response(Bun.file(join(PUBLIC_DIR, "llms.txt")), {
      headers: { "Content-Type": "text/plain", "Cache-Control": CACHE_LONG },
    }),
    // CV - auto-download
    "/cv": new Response(Bun.file(join(PUBLIC_DIR, "JunaidAliCv.pdf")), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="JunaidAliCv.pdf"',
        "Cache-Control": CACHE_LONG,
      },
    }),
    "/_headers": new Response(Bun.file(join(PUBLIC_DIR, "_headers")), {
      headers: { "Content-Type": "text/plain", "Cache-Control": CACHE_LONG },
    }),
    // Screenshots - serve PNG files
    "/screenshots/:filename": {
      async GET(req) {
        const filename = req.params.filename;
        // Sanitize filename - only allow alphanumeric, hyphens, and dots
        if (!/^\w[\w.-]*\.png$/.test(filename)) {
          return new Response("Not Found", { status: 404 });
        }
        const filePath = join(PUBLIC_DIR, "screenshots", filename);
        const file = Bun.file(filePath);
        const exists = await file.exists();
        if (exists) {
          return new Response(file, {
            headers: { "Content-Type": "image/png", "Cache-Control": CACHE_IMMUTABLE },
          });
        }
        return new Response("Not Found", { status: 404 });
      },
    },
    // All other routes -> index.html (no cache for HTML)
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
