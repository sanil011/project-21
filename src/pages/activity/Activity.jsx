import React, { useEffect, useState } from 'react';
import './Activity.css';
import {ActivityBanner} from '../../data'; // 👈 depends on your export

// 🔽 Image imports for the icon grid and middle cards
import activityAward from '../assets/activityReward.png';
import bettingRebate from '../assets/BettingRebate.png';
import superJackpot from '../assets/superJackpot.png';
import newMember from '../assets/memberGift.png';
import gifts from '../assets/giftRedeem.png';
import attendance from '../assets/signInBanner.png';

const Activity = () => {
  const [activeBannerKeys, setActiveBannerKeys] = useState([]);

  useEffect(() => {
    // Simulated API call
    const response = ['firstDeposit', 'dailyCheckin', 'aviator'];
    setActiveBannerKeys(response);
  }, []);

  const filteredBanners = ActivityBanner.filter(banner =>
    activeBannerKeys.includes(banner.key)
  );

  return (
    <div className="activity-page">
      {/* 🔹 Header Section */}
      <div className="activity-header">
        <h2 className="activity-header-title">Activity</h2>
        <p>
          Please remember to follow the event page<br />
          We will launch user feedback activities from time to time
        </p>
      </div>

      {/* 🔹 Top Icon Grid */}
      <div className="activity-top-grid">
        <div className="activity-icon-box">
          <img src={activityAward} alt="Activity Award" />
          <span>Activity Award</span>
        </div>
        <div className="activity-icon-box">
          <img src={bettingRebate} alt="Betting Rebate" />
          <span>Betting Rebate</span>
        </div>
        <div className="activity-icon-box">
          <img src={superJackpot} alt="Super Jackpot" />
          <span>Super Jackpot</span>
        </div>
        <div className="activity-icon-box">
          <img src={newMember} alt="New Member Gift" />
          <span>New Member Gift Package</span>
        </div>
      </div>

      {/* 🔹 Middle Grid Cards */}
      <div className="activity-middle-grid">
        <div className="activity-card">
          <img src={gifts} alt="Gifts" />
          <h2 className="activity-cards-title">Gifts</h2>
          <p>Enter the redemption code to receive gift rewards</p>
        </div>
        <div className="activity-card">
          <img src={attendance} alt="Attendance Bonus" />
          <h3 className="activity-cards-title">Attendance Bonus</h3>
          <p>The more consecutive days you sign in, the higher the reward will be.</p>
        </div>
      </div>

      {/* 🔹 Bottom Banners (Dynamic) */}
      {filteredBanners.map(banner => (
        <div key={banner.id} className="activity-banner">
          <img src={banner.image} alt={banner.title} />
          <p>{banner.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Activity;
