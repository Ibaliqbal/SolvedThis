import { UTApi } from "uploadthing/server";

export const utApi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!,
});
