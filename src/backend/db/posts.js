import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
    mediaUrl: "",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sasta_arjit",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
    mediaUrl: "",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.",
    likes: {
      likeCount: 6,
      likedBy: [
        {
          _id: "afadbcf4-ea27-4e30-a058-acaf101a9f7c",
          firstName: "Adarsh",
          lastName: "Balika",
          username: "adarshbalika",
          password: "adarshBalika123",
          picUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688910763/twitlyx/adarsh-balika_blzvbt.jpg",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688923211/twitlyx/pexels-pixabay-163036_a52vxe.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
        {
          _id: "bc5cfc5b-62dc-43e3-aac1-d920066e7427",
          firstName: "Elon",
          lastName: "Mast",
          username: "elonmast",
          password: "elonMast123",
          picUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688923899/twitlyx/elon-must_ydcl3b.jpg",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688924058/twitlyx/tesla-fans-schweiz-2swaWy4Xhb0-unsplash_d5qoqa.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
        {
          _id: "55a7e27f-1ed9-434b-87e4-2e0b308c4b16",
          firstName: "Sad",
          lastName: "Moustachim",
          username: "moustachim69",
          password: "sadMoustachim123",
          picUrl: "https://github.com/syedmustassim.png",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688923211/twitlyx/pexels-el%C4%ABna-ar%C4%81ja-3317038_mquokb.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
        {
          _id: "9d2f44ab-96fc-4744-b83d-e7cbc3be21b5",
          firstName: "Yes",
          lastName: "Yamaha",
          username: "wanderlust420",
          password: "yesPatidar123",
          picUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688578534/twitlyx/yespatidar_jp345o.jpg",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688578534/twitlyx/yespatidar_jp345o.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
        {
          _id: "e29082cc-d57b-4f3d-a863-0e2dc4ed02ba",
          firstName: "Shubhi",
          lastName: "K",
          username: "sasta_arjit",
          password: "shubumK123",
          picUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688910761/twitlyx/shubhi-dp_ayn4f6.jpg",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688923210/twitlyx/pexels-pixabay-160472_xkvnep.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
        {
          _id: "09ab1282-7e8b-4658-b2be-326504d10f68",
          firstName: "Princess",
          lastName: "Rani",
          username: "silentQueen",
          password: "princess123",
          picUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688910761/twitlyx/prince-dp_n5tmsl.jpg",
          bgUrl:
            "https://res.cloudinary.com/dbe8yf165/image/upload/v1688923210/twitlyx/pexels-pixabay-207983_hblt3s.jpg",
          createdAt: formatDate(),
          updatedAt: formatDate(),
          bookmarks: [],
          followers: [],
          following: [],
        },
      ],
      dislikedBy: [],
    },
    username: "gautam.bm",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
    mediaUrl: "",
  },
];
