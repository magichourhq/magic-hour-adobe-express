# Magic Hour for Adobe Express

Magic Hour Video is an add-on for Adobe Express. Upload an image, or explicitly export the current page, describe the motion, and generate a short video with the [Magic Hour API](https://docs.magichour.ai). Preview the result, then add it to your design as a video.

- The add-on needs your own Magic Hour API key. It stays in memory while the panel is open.
- Exporting the current page checks that the design is approved for export. If it isn't, choose an image file instead.
- The accepted project ID is saved in Adobe's per-user client storage, so you can resume a generation without paying again.
- Source elements in your design are never replaced or deleted.

The panel comes from [`@magichourhq/editor-kit`](https://github.com/magichourhq/editor-kit), imported as `import { DesignVideo } from "@magichourhq/editor-kit"`, and adds its own styles at runtime. This repo adds the Adobe Express host and the manifest.

## Local development

Requires Node 24 and Yarn 4.

```sh
yarn install
yarn check
yarn test
yarn build
```

`yarn build` writes the add-on to `dist/`: `manifest.json`, `index.html` and `app.js`.

To load it in Adobe Express, serve `dist` over locally trusted HTTPS. Set `LOCAL_TLS_KEY` and `LOCAL_TLS_CERT` to your certificate files, then run `yarn serve` (port 5173, or set `PORT`). Open the address once to trust the certificate, then load the add-on from Adobe Express with add-on development enabled.

## Release

Releases are submitted by hand. Nothing is uploaded to Adobe automatically.

1. In a PR, bump `version` in both `package.json` and `manifest.json` to the same value, and merge it to `main`.
2. The Release workflow builds the add-on and creates the GitHub release `v<version>` with `magic-hour-adobe-express-<version>.zip` attached. The zip is the contents of `dist/`, with `manifest.json` at its root.
3. Download the zip from the release.
4. In the Adobe Express developer distribution, upload the zip as the add-on package.
