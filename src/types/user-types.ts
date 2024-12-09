export type TUser = {
  username: string;
  nickname: string;
  avatar: string | null;
  id: number;
  followed: boolean;
  wallet_address?: string;
};
