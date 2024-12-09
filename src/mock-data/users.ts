// mock data , you can replace it with your own data

import { TUser } from "../types/user-types";

// with null avatar
export const mockSuggestFollowUsers: TUser[] = [
  {
    id: 1,
    nickname: "John Doe",
    username: "johndoe",
    avatar: null,
    followed: false,
  },
  {
    id: 2,
    nickname: "Jane Doe",
    username: "janedoe",
    avatar: null,
    followed: true,
  },
  {
    id: 3,
    nickname: "John Smith",
    username: "johnsmith",
    avatar: null,
    followed: false,
  },
  {
    id: 4,
    nickname: "Jane Smith",
    username: "janesmith",
    avatar: null,
    followed: false,
  },
  {
    id: 5,
    nickname: "John Doe",
    username: "johndoe",
    avatar: null,
    followed: true,
  },
  {
    id: 6,
    nickname: "Jane Doe",
    username: "janedoe",
    avatar: null,
    followed: true,
  },
  {
    id: 7,
    nickname: "John Smith",
    username: "johnsmith",
    avatar: null,
    followed: false,
  },
  {
    id: 8,
    nickname: "Jane Smith",
    username: "janesmith",
    avatar: null,
    followed: false,
  },
  {
    id: 9,
    nickname: "John Doe",
    username: "johndoe",
    avatar: null,
    followed: true,
  },
  {
    id: 10,
    nickname: "Jane Doe",
    username: "janedoe",
    avatar: null,
    followed: false,
  },
  {
    id: 11,
    nickname: "John Smith",
    username: "johnsmith",
    avatar: null,
    followed: false,
  },
  {
    id: 12,
    nickname: "Jane Smith",
    username: "janesmith",
    avatar: null,
    followed: false,
  },
];

export const mockCurrentUser: TUser = {
  id: 1,
  nickname: "Leo",
  username: "leo0909",
  avatar: null,
  followed: false,
  wallet_address: "0x1234567890",
};
