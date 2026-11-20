import { build } from "esbuild";
import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await build({
  entryPoints: ["src/main.ts"],
  outfile: "dist/app.js",
  bundle: true,
  target: "es2022",
  format: "esm",
  legalComments: "eof",
  define: { "process.env.NODE_ENV": '"production"' },
  external: ["https://express.adobe.com/static/add-on-sdk/sdk.js"],
});
await copyFile("manifest.json", "dist/manifest.json");
await writeFile(
  "dist/index.html",
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Magic Hour for Adobe Express</title></head><body><div id="root"></div><script type="module" src="app.js"></script></body></html>`
);
