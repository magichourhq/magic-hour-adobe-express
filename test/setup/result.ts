import type { DesignVideo } from "@magichourhq/editor-kit";
export const result: DesignVideo.VideoResult = {
  id: "existing-video",
  blob: new Blob(["video"], { type: "video/mp4" }),
  url: "https://media.example/video.mp4",
  expiresAt: "2030-01-01T00:00:00Z",
  credits: 24,
};
