import { expect, test } from "vitest";
import { adobeHost } from "../src/host";
import { result } from "./setup/result";

test("rejects restricted exports before capturing the page", async () => {
  let renditions = 0;
  const sdk: any = {
    instance: { clientStorage: {} },
    app: {
      document: {
        exportAllowed: async () => false,
        createRenditions: async () => {
          renditions++;
          return [];
        },
      },
    },
  };
  await expect(adobeHost(sdk).captureImage!()).rejects.toThrow(/not approved for export/);
  expect(renditions).toBe(0);
});

test("captures the current page with export intent and imports the video blob", async () => {
  const png = new Blob(["png"], { type: "image/png" });
  let args: unknown[] = [];
  let added: unknown;
  const sdk: any = {
    instance: { clientStorage: {} },
    constants: {
      Range: { currentPage: "current-page" },
      RenditionFormat: { png: "image/png" },
      RenditionIntent: { export: "export" },
    },
    app: {
      document: {
        exportAllowed: async () => true,
        createRenditions: async (...a: unknown[]) => {
          args = a;
          return [{ blob: png }];
        },
        addVideo: async (blob: Blob) => {
          added = blob;
        },
      },
    },
  };
  const host = adobeHost(sdk);
  expect((await host.captureImage!()).blob).toBe(png);
  expect(args).toEqual([{ range: "current-page", format: "image/png" }, "export"]);
  await host.insertVideo(result);
  expect(added).toBe(result.blob);
});
