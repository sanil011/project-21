// 🔽 Image imports
import firstDeposit from './banner-images/Banner_firstDeposit.png';
import dailyCheckin from './banner-images/Banner_dailyCheckin.png';
import aviator from './banner-images/Banner_aviator.png';
import lucky10 from './banner-images/Banner_lucky10.png';
import youtube from './banner-images/Banner_youtube.png';
import randomBonus from './banner-images/Banner_ramdomBonus.png';
import winStreak from './banner-images/Banner_winStreak.png';
import {
  carouselImageFive,
  carouselImageFour,
  carouselImageOne,
  carouselImageSix,
  carouselImageThree,
  carouselImageTwo,
  carouselImageSeven,
  carouselImageEight,
  carouselImageNine
} from "../images";

const ActivityBanner = [
  {
    id: 1,
    key: 'firstDeposit',
    image: firstDeposit,
    title: '⭐ First Deposit Bonus ⭐',
  },
  {
    id: 2,
    key: 'dailyCheckin',
    image: dailyCheckin,
    title: '💰 Get Daily Check-In Bonus 💰',
  },
  {
    id: 3,
    key: 'aviator',
    image: aviator,
    title: '✈️ Aviator Fly High & Win Big ✈️',
  },
  {
    id: 4,
    key: 'lucky10',
    image: lucky10,
    title: '🎉 Lucky “10” Days Of Interest 🎉',
  },
  {
    id: 5,
    key: 'youtube',
    image: youtube,
    title: '🎥 Youtube Creative Video 🎥',
  },
  {
    id: 6,
    key: 'randomBonus',
    image: randomBonus,
    title: '🎁 Mysterious Gift 🎁',
  },
  {
    id: 7,
    key: 'winStreak',
    image: winStreak,
    title: '🔥 Member Wingo Winning Streak 🔥',
  }
];

export default ActivityBanner;
