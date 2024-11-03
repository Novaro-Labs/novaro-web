import { request } from "@/utils/request.ts";

export const postUploadImages = ({ image, sourceId }: { image: File, sourceId: string; }): Promise<any> => {
  const formData = new FormData();
  formData.append(`images`,image);
  formData.append('sourceId', sourceId);

  return request.post("/v1/api/upload/files", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getImages = ({ sourceId }: { sourceId: string; }): Promise<any> =>
  request.get("/v1/api/upload/getTokenImg", {
    params: { sourceId },
  });