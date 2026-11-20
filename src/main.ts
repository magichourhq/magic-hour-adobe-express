import sdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
import { DesignVideo } from "@magichourhq/editor-kit";
import { adobeHost } from "./host";
await sdk.ready;
DesignVideo.mountPanel(adobeHost(sdk));
