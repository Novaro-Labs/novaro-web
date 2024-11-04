import { request } from "@/utils/request.ts";

export const postUploadImages = ({ image }: { image: File }): Promise<any> => {
  const formData = new FormData();
  formData.append(`images`,image);

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