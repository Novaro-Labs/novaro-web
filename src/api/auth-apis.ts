import { request } from "@/utils/request";

export const authX = ({
  invitationCode,
}: {
  invitationCode: string;
}): Promise<any> =>
  request.get("/v1/auth/login", {
    params: { icode: invitationCode },
    maxRedirects: 0,
  });
