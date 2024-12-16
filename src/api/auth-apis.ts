import { request } from "@/utils/request";

export const authX = ({
  invitationCode,
}: {
  invitationCode: string;
}): Promise<any> =>
  request.get("/v1/auth/login", {
    params: { code: invitationCode },
    maxRedirects: 0,
  });

export const authCallback = ({
  invitationCode,
  state,
}: {
  invitationCode: string;
  state: string;
}): Promise<any> =>
  request.get("/v1/auth/callback", {
    params: { code: invitationCode, state },
    maxRedirects: 0,
  });
