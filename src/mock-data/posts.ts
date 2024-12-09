import { TPost } from "../types/post-types";
import { mockCurrentUser } from "./users";

export const mockPosts: TPost[] = [
  {
    id: 1,
    author: {
      id: 1,
      nickname: "Leo",
      username: "@leosmith",
      avatar: "",
      followed: false,
    },
    content:
      "Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing 🍊🍊🍊...",
    timestamp: "12 April at 09:28 PM",
    like_count: 23500,
    reply_count: 534,
    share_count: 1230,
    favored: true,
    vote_count: 0,
  },
  {
    id: 2,
    author: {
      id: 2,
      nickname: "John",
      username: "@johnsmith",
      avatar:
        "https://storage-aspecta-id.s3.us-east-2.amazonaws.com/app-backend/production/media/avatar/avatar-130563.jpg?v=1727177951.098378",
      followed: true,
    },
    content:
      "Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing 🍊🍊🍊...",
    timestamp: "12 April at 10:28 PM",
    like_count: 23500,
    reply_count: 534,
    share_count: 2383,
    vote_count: 100,
  },
  {
    id: 3,
    author: {
      id: 3,
      nickname: "Alice",
      username: "@alicewonder",
      avatar: null,
      followed: false,
    },
    content: "Exploring the wonders of the world! 🌍✨",
    timestamp: "13 April at 08:15 AM",
    like_count: 1500,
    reply_count: 120,
    share_count: 300,
    favored: false,
    vote_count: 50,
  },
  {
    id: 4,
    author: {
      id: 4,
      nickname: "Bob",
      username: "@bobthebuilder",
      avatar: null,
      followed: true,
    },
    content: "Building something amazing today! 🛠️🚧",
    timestamp: "13 April at 09:45 AM",
    like_count: 3200,
    reply_count: 450,
    share_count: 600,
    favored: true,
    vote_count: 200,
  },
  {
    id: 5,
    author: {
      id: 5,
      nickname: "Charlie",
      username: "@charliebrown",
      avatar: null,
      followed: false,
    },
    content: "Life is like a box of chocolates 🍫",
    timestamp: "13 April at 11:30 AM",
    like_count: 5000,
    reply_count: 800,
    share_count: 1000,
    favored: false,
    vote_count: 300,
  },
  {
    id: 6,
    author: {
      id: 6,
      nickname: "Diana",
      username: "@dianaprince",
      avatar: null,
      followed: true,
    },
    content: "Empowering women everywhere 💪👩‍🎤",
    timestamp: "13 April at 01:00 PM",
    like_count: 7500,
    reply_count: 900,
    share_count: 1200,
    favored: true,
    vote_count: 400,
  },
  {
    id: 7,
    author: {
      id: 7,
      nickname: "Eve",
      username: "@eveonline",
      avatar: null,
      followed: false,
    },
    content: "Exploring the digital universe 🌌",
    timestamp: "13 April at 02:45 PM",
    like_count: 6200,
    reply_count: 700,
    share_count: 800,
    favored: false,
    vote_count: 350,
  },
];

// mock data , you can replace it with your own data
// author is @leo0909
export const mockOwnPosts: TPost[] = [
  {
    id: 1,
    author: mockCurrentUser,
    content:
      "Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing 🍊🍊🍊...",
    timestamp: "12 April at 09:28 PM",
    like_count: 23500,
    reply_count: 534,
    share_count: 1230,
    favored: true,
    vote_count: 0,
  },
  {
    id: 2,
    author: mockCurrentUser,
    content:
      "Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing 🍊🍊🍊...",
    timestamp: "12 April at 10:28 PM",
    like_count: 23500,
    reply_count: 534,
    share_count: 2383,
    vote_count: 100,
  },
];

export const mockWithCommentsPosts: TPost[] = [
  {
    id: 2,
    author: {
      id: 2,
      nickname: "John",
      username: "@johnsmith",
      avatar:
        "https://storage-aspecta-id.s3.us-east-2.amazonaws.com/app-backend/production/media/avatar/avatar-130563.jpg?v=1727177951.098378",
      followed: true,
    },
    content:
      "Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing 🍊🍊🍊...",
    timestamp: "12 April at 10:28 PM",
    like_count: 23500,
    reply_count: 534,
    share_count: 2383,
    vote_count: 100,
    comments: [
      {
        id: 10,
        reply_to_post_id: 2,
        author: mockCurrentUser,
        content:
          "Very Good",
        timestamp: "12 April at 09:28 PM",
        like_count: 234,
        reply_count: 34,
        share_count: 10,
        favored: true,
        vote_count: 0,
      },
    ],
  },
];
