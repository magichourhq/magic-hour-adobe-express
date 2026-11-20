import sdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
import { mountPanel } from "@magichourhq/editor-kit/panel";
import { adobeHost } from "./host";
await sdk.ready;
mountPanel(adobeHost(sdk));
