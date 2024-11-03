import { request } from "@/utils/request.ts";

export const postUploadImages = ({ images, sourceId }: { images: File, sourceId: string; }): Promise<any> =>
  request.post("/v1/api/upload/files", {
    body: { images, sourceId },
  });

export const getImages = ({ sourceId }: { sourceId: string; }): Promise<any> =>
  request.get("/v1/api/upload/getTokenImg", {
    params: { sourceId },
  });