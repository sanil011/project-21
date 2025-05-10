import {
  lotteryFour,
  lotteryOne,
  lotteryThree,
  lotteryTwo,
  originalOne,
  originalTwo,
  originalThree,
  originalFour,
  originalFive,
  originalSix,
  recommendationOne,
  recommendationTwo,
  recommendationThree,
  recommendationFour,
  recommendationFive,
  recommendationSix,
  slotsOne,
  slotsTwo,
  slotsThree,
  slotsFour,
  slotsFive,
  slotsSix,
  sportsOne,
  sportsTwo,
  casinoOne,
  casinoTwo,
  casinoThree,
  casinoFour,
  casinoFive,
  casinoSix,
  fishingOne,
  fishingTwo,
  fishingThree,
  fishingFour,
  fishingFive,
  fishingSix,
  rummyOne,
  virtualOne,
  virtualTwo,
  virtualThree,
  virtualFour,
  virtualFive,
  virtualSix,
  virtualSeven,
} from "../images";

// const gameCategories = [
//   {
//     id: 1,
//     title: "Lottery",
//     totalGames: 4,
//     gameCategoryUrl: "/games/lottery",
//     games: [
//       {
//         id: 1.1,
//         text: "Win Go",
//         img: lotteryOne,
//         gameUrl: "win-go",
//       },
//       {
//         id: 1.2,
//         text: "K3",
//         img: lotteryTwo,
//         gameUrl: "k3",
//       },
//       {
//         id: 1.3,
//         text: "5D",
//         img: lotteryThree,
//         gameUrl: "5d",
//       },
//       {
//         id: 1.4,
//         text: "Try Win Go",
//         img: lotteryFour,
//         gameUrl: "try-win-go",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Original",
//     totalGames: 35,
//     gameCategoryUrl: "/games/original",
//     games: [
//       {
//         id: 2.1,
//         img: originalOne,
//         gameUrl: "aviator",
//       },
//       {
//         id: 2.2,
//         img: originalTwo,
//         gameUrl: "plinko",
//       },
//       {
//         id: 2.3,
//         img: originalThree,
//         gameUrl: "limbo",
//       },
//       {
//         id: 2.4,
//         img: originalFour,
//         gameUrl: "aviator",
//       },
//       {
//         id: 2.5,
//         img: originalFive,
//         gameUrl: "plinko",
//       },
//       {
//         id: 2.6,
//         img: originalSix,
//         gameUrl: "mines",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Platform Recommendation",
//     totalGames: 6,
//     gameCategoryUrl: "/games/platform-recommendation",
//     games: [
//       {
//         id: 3.1,
//         img: recommendationOne,
//         odd: 97.28,
//         gameUrl: "aviator",
//       },
//       {
//         id: 3.2,
//         img: recommendationTwo,
//         odd: 96.44,
//         gameUrl: "aviator",
//       },
//       {
//         id: 3.3,
//         img: recommendationThree,
//         odd: 97.55,
//         gameUrl: "fortune-ox",
//       },
//       {
//         id: 3.4,
//         img: recommendationFour,
//         odd: 96.34,
//         gameUrl: "royal-fishing",
//       },
//       {
//         id: 3.5,
//         img: recommendationFive,
//         odd: 96.16,
//         gameUrl: "super-rich",
//       },
//       {
//         id: 3.6,
//         img: recommendationSix,
//         odd: 96.16,
//         gameUrl: "fortune-rabbit",
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Slots",
//     totalGames: 8,
//     gameCategoryUrl: "/games/slots",
//     games: [
//       {
//         id: 4.1,
//         img: slotsOne,
//         gameUrl: "jili-game",
//       },
//       {
//         id: 4.2,
//         img: slotsTwo,
//         gameUrl: "pg-game",
//       },
//       {
//         id: 4.3,
//         img: slotsThree,
//         gameUrl: "ag-game",
//       },
//       {
//         id: 4.4,
//         img: slotsFour,
//         gameUrl: "m-game",
//       },
//       {
//         id: 4.5,
//         img: slotsFive,
//         gameUrl: "cqo-game",
//       },
//       {
//         id: 4.6,
//         img: slotsSix,
//         gameUrl: "evolution",
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "Sports",
//     totalGames: 2,
//     gameCategoryUrl: "/games/sports",
//     games: [
//       {
//         id: 5.1,
//         img: sportsOne,
//         gameUrl: "sports",
//       },
//       {
//         id: 5.2,
//         img: sportsTwo,
//         gameUrl: "sports",
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: "Casino",
//     totalGames: 6,
//     gameCategoryUrl: "/games/casino",
//     games: [
//       {
//         id: 6.1,
//         img: casinoOne,
//         gameUrl: "crazy-time",
//       },
//       {
//         id: 6.2,
//         img: casinoTwo,
//         gameUrl: "dragon-tiger",
//       },
//       {
//         id: 6.3,
//         img: casinoThree,
//         gameUrl: "american-routette",
//       },
//       {
//         id: 6.4,
//         img: casinoFour,
//         gameUrl: "andar-bahar",
//       },
//       {
//         id: 6.5,
//         img: casinoFive,
//         gameUrl: "auto-roulete",
//       },
//       {
//         id: 6.6,
//         img: casinoSix,
//         gameUrl: "super-sic-bo",
//       },
//     ],
//   },
//   {
//     id: 7,
//     title: "Fishing",
//     totalGames: 21,
//     gameCategoryUrl: "/games/fishing",
//     games: [
//       {
//         id: 7.1,
//         img: fishingOne,
//         gameUrl: "royal-fishing",
//       },
//       {
//         id: 7.2,
//         img: fishingTwo,
//         gameUrl: "all-star-fishing",
//       },
//       {
//         id: 7.3,
//         img: fishingThree,
//         gameUrl: "bombing-fishing",
//       },
//       {
//         id: 7.4,
//         img: fishingFour,
//         gameUrl: "dinosaur-tycoon",
//       },
//       {
//         id: 7.5,
//         img: fishingFive,
//         gameUrl: "jackpot-fishing",
//       },
//       {
//         id: 7.6,
//         img: fishingSix,
//         gameUrl: "dinosaur-tycoon",
//       },
//     ],
//   },
//   {
//     id: 8,
//     title: "Rummy",
//     gameCategoryUrl: "/games/rummy",
//     totalGames: 1,
//     games: [
//       {
//         id: 8.1,
//         img: rummyOne,
//         gameUrl: "rummy",
//       },
//     ],
//   },
// ];
const gameCategories = [
  {
    id: 1,
    title: "Lottery",
    totalGames: 4,
    gameCategoryUrl: "/games/lottery",
    games: [
      {
        id: 1.1,
        text: "Win Go",
        img: lotteryOne,
        gameUrl: "wingo-lottery",
      },
      {
        id: 1.2,
        text: "K3",
        img: lotteryTwo,
        gameUrl: null,
      },
      {
        id: 1.3,
        text: "5D",
        img: lotteryThree,
        gameUrl: null,
      },
      {
        id: 1.4,
        text: "Try Win Go",
        img: lotteryFour,
        gameUrl: null,
      },
    ],
  },
  {
    id: 2,
    title: "Virtual",
    totalGames: 7,
    gameCategoryUrl: "/games/virtual-games",
    games: [
      {
        id: 2.1,
        text: "Aviator",
        img: originalFour,
        gameUrl: "aviator",
      },
      // {
      //   id: 2.2,
      //   text: "Heads & Tails",
      //   img: virtualTwo,
      //   gameUrl: "heads-and-tails",
      // },
      {
        id: 2.3,
        text: "Wingo Lottery",
        img: virtualThree,
        gameUrl: "wingo-lottery",
      },
      {
        id: 2.4,
        text: "Dice",
        img: virtualFour,
        gameUrl: "dice",
      },
      // {
      //   id: 2.5,
      //   text: "Mines Land",
      //   img: virtualFive,
      //   gameUrl: "mines-land",
      // },
      // {
      //   id: 2.6,
      //   text: "Ballon",
      //   img: virtualSix,
      //   gameUrl: "ballon",
      // },
      {
        id: 2.7,
        text: "Pushpa",
        img: virtualSeven,
        gameUrl: "pushpa",
      },
    ],
  },
  {
    id: 3,
    title: "Jilli",
    gameCategoryUrl: "/games/jilli",
    games: [
      {
        name: "Royal Fishing",
        id: "e794bf5717aca371152df192341fe68b",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Royal-Fishing.png",
      },
      {
        name: "Bombing Fishing",
        id: "e333695bcff28acdbecc641ae6ee2b23",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Bombing-Fishing.png",
      },
      {
        name: "Dinosaur Tycoon",
        id: "eef3e28f0e3e7b72cbca61e7924d00f1",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Dinosaur-Tycoon.png",
      },
      {
        name: "Jackpot Fishing",
        id: "3cf4a85cb6dcf4d8836c982c359cd72d",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Jackpot-Fishing.png",
      },
      {
        name: "Dragon Fortune",
        id: "1200b82493e4788d038849bca884d773",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Dragon-Fortune.png",
      },
      {
        name: "Mega Fishing",
        id: "caacafe3f64a6279e10a378ede09ff38",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Mega-Fishing.png",
      },
    ],
  },
  {
    id: 4,
    title: "Slots",
    gameCategoryUrl: "/games/slots",
    games: [
      {
        name: "Mahjong Ways",
        id: "1189baca156e1bbbecc3b26651a63565",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Mahjong-Ways_rounded_1024.png",
      },
      {
        name: "Mahjong Ways 2",
        id: "ba2adf72179e1ead9e3dae8f0a7d4c07",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Mahjong-Ways2_rounded_1024.png",
      },
      {
        name: "Treasures of Aztec",
        id: "2fa9a84d096d6ff0bab53f81b79876c8",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Treasures-of-Aztec_rounded_1024.png",
      },
      {
        name: "Leprechaun Riches",
        id: "fb2a2ac51303c0a0801dbe6a72d936f7",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Leprechaun-Riches_rounded_1024.png",
      },
      {
        name: "Lucky Neko",
        id: "e1b4c6b95746d519228744771f15fe4b",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Lucky-Neko_icon_1024_rounded.png",
      },
      {
        name: "Captain's Bounty",
        id: "cd29b9906a852ce26b53b6d6d81037d4",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/pg/Captains-Bounty_Icon_Rounded_1024.png",
      },
    ],
  },
];

export default gameCategories;
