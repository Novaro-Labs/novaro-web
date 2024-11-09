import { TUser } from "./user-types";

export type TNft = {
  id: string;
  name: string;
  des: string;
  sourceId: string;
  price: number;
  createdAt: Date;
  creator: TUser;
  deployer:string;
  token: string
};
