import React, { useState } from 'react';
import './Rewards.css';
import {
  FaRupeeSign, FaGift, FaUmbrellaBeach, FaWater, FaSnowflake, FaCameraRetro, FaBoxOpen, FaLock,
  FaTrophy, FaStar, FaCoins, FaFire
} from 'react-icons/fa';

const motivationalQuotes = [
  "Travel far enough, you meet yourself.",
  "Life is short and the world is wide.",
  "Jobs fill your pocket, but adventures fill your soul.",
  "Live with no excuses and travel with no regrets.",
  "Collect moments, not things."
];

const rewardsCatalog = [
  { id: 1, name: '10% Discount on Hotel', pointsRequired: 500, description: 'Get a 10% discount on your next hotel booking' },
  { id: 2, name: 'Free Upgrade to Business Class', pointsRequired: 1000, description: 'Upgrade your next flight to Business Class' },
  { id: 3, name: 'Free Trip (1 night)', pointsRequired: 2000, description: 'Enjoy a free 1-night stay at any partner hotel' },
  { id: 4, name: 'Airport Lounge Access', pointsRequired: 750, description: 'Relax at premium airport lounges before your flight' },
];

const trips = {
  'Goa Weekend Escape': {
    price: '₹30,000',
    icon: <FaUmbrellaBeach />,
    itinerary: ['Arrival at Goa, Explore North Goa Beaches.', 'Water Sports, Visit Fort Aguada.', 'South Goa Beaches, Colva, return.']
  },
  'Kashmir Serenity': {
    price: '₹55,000',
    icon: <FaSnowflake />,
    itinerary: ['Explore Dal Lake and Mughal Gardens.', 'Visit Pahalgam & Betaab Valley.', 'Gulmarg Skiing & Return to Srinagar.']
  },
  'Meghalaya Adventure': {
    price: '₹40,000',
    icon: <FaWater />,
    itinerary: ['Shillong & Elephant Falls.', 'Living Root Bridges, Cherrapunji.', 'Nohkalikai Trek, Mawsmai Caves.']
  }
};

const Rewards = () => {
  const [caption, setCaption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showLoot, setShowLoot] = useState(false);
  const [quote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  // Mock user data
  const user = {
    totalPoints: 1200,
    earnedPoints: 400,
    xp: 2500,
    planMonths: 6,
    monthlyDeposit: 2000,
    currentSaved: 12000
  };

  const level = Math.floor(user.xp / 1000) + 1;
  const progress = user.xp % 1000;

  const milestones = [
    { name: "First ₹1000 Saved", achieved: user.currentSaved >= 1000 },
    { name: "First Redemption", achieved: user.totalPoints < 1500 },
    { name: "Uploaded Reel", achieved: user.xp > 1800 },
    { name: "Reached Level 3", achieved: level >= 3 }
  ];

  const handleUploadReel = () => {
    alert('📹 Reel uploaded! (mock)');
    setCaption('');
  };

  const handleDeposit = () => {
    alert(`₹${user.monthlyDeposit} deposited! (mock)`);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const redeemReward = (reward) => {
    alert(`🎉 Redeemed: ${reward.name}\nCode: MOCK123`);
  };

  const unlockLootBox = () => {
    alert(` You unlocked a surprise reward!`);
    setShowLoot(true);
  };

  return (
    <div className="rewards-container">
      <header className="header">
        <h1> Travel Rewards</h1>
        <p>Save, Earn, and Travel Smarter!</p>
        <q className="quote">“{quote}”</q>
      </header>

      <section className="summary-section">
        <div className="card total-points"><FaCoins /> <h3>{user.totalPoints} Points</h3></div>
        <div className="card earned-points"><FaStar /> <h3>{user.earnedPoints} This Month</h3></div>
        <div className="card level-progress">
          <h3><FaFire /> Level {level}</h3>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${progress / 10}%` }}></div>
          </div>
          <p>{progress}/1000 XP to next level</p>
        </div>
      </section>

      <section className="reel-upload">
        <h2><FaCameraRetro /> Upload Travel Reel</h2>
        <input type="text" placeholder="Caption your reel..." value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button onClick={handleUploadReel}>Upload & Earn</button>
      </section>

      <section className="saving-plan">
        <h2><FaRupeeSign /> Start Saving</h2>
        <div className="controls">
          <label>Plan Duration:
            <select value={user.planMonths} disabled>
              <option>{user.planMonths} Months</option>
            </select>
          </label>
          <label>Monthly Deposit:
            <input type="number" value={user.monthlyDeposit} disabled />
          </label>
          <button onClick={handleDeposit}>Deposit ₹{user.monthlyDeposit}</button>
        </div>
        <div className="progress">
          <p>Saved: ₹{user.currentSaved} / ₹{user.planMonths * user.monthlyDeposit}</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${(user.currentSaved / (user.planMonths * user.monthlyDeposit)) * 100}%` }}></div>
          </div>
        </div>

        {user.currentSaved >= user.planMonths * user.monthlyDeposit && (
          <div className="trip-options">
            <h3> Travel Plans Unlocked!</h3>
            <div className="trips-grid">
              {Object.entries(trips).map(([title, data]) => (
                <div className="trip-card" key={title} onClick={() => handlePlanSelection(title)}>
                  <div className="trip-icon">{data.icon}</div>
                  <h4>{title}</h4>
                  <p>{data.price}</p>
                  <button>View Plan</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="lootbox">
        <h2><FaBoxOpen /> Loot Box</h2>
        <button onClick={unlockLootBox}>Open Surprise Box (Lvl 3+)</button>
        {showLoot && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowLoot(false)}>&times;</span>
              <h2> You got a mock reward!</h2>
            </div>
          </div>
        )}
      </section>

      {showModal && selectedPlan && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{selectedPlan}</h2>
            <p><strong>Price:</strong> {trips[selectedPlan].price}</p>
            <ul>
              {trips[selectedPlan].itinerary.map((step, idx) => (
                <li key={idx}> {step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <section className="badges">
        <h2><FaTrophy /> Achievements</h2>
        <div className="badge-grid">
          {milestones.map((m, idx) => (
            <div className={`badge ${m.achieved ? 'achieved' : ''}`} key={idx}>
              {m.achieved ? <FaTrophy /> : <FaLock />} {m.name}
            </div>
          ))}
        </div>
      </section>

      <section className="rewards">
        <h2><FaGift /> Redeem Rewards</h2>
        <div className="rewards-grid">
          {rewardsCatalog.map(reward => (
            <div className="reward-card" key={reward.id}>
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
              <p><strong>Points:</strong> {reward.pointsRequired}</p>
              <button onClick={() => redeemReward(reward)}>Redeem</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rewards;
