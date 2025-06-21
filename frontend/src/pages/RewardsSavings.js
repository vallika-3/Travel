import React, { useState } from 'react';
import './Rewards.css';
import {
  FaRupeeSign,
  FaGift,
  FaPlane,
  FaUmbrellaBeach,
  FaWater,
  FaSnowflake,
  FaCameraRetro,
  FaBoxOpen,
  FaLock,
  FaTrophy,
} from 'react-icons/fa';

const rewardsCatalog = [
  { id: 1, name: '10% Discount on Hotel', pointsRequired: 500, description: 'Get a 10% discount on your next hotel booking' },
  { id: 2, name: 'Free Upgrade to Business Class', pointsRequired: 1000, description: 'Upgrade your next flight to Business Class' },
  { id: 3, name: 'Free Trip (1 night)', pointsRequired: 2000, description: 'Enjoy a free 1-night stay at any partner hotel' },
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
  const [totalPoints, setTotalPoints] = useState(1500);
  const [earnedPoints, setEarnedPoints] = useState(500);
  const [xp, setXP] = useState(1800); // XP for leveling
  const [planMonths, setPlanMonths] = useState(6);
  const [monthlyDeposit, setMonthlyDeposit] = useState(1000);
  const [currentSaved, setCurrentSaved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [redeemedCode, setRedeemedCode] = useState('');
  const [caption, setCaption] = useState('');
  const [lootReward, setLootReward] = useState('');
  const [showLoot, setShowLoot] = useState(false);

  const level = Math.floor(xp / 1000) + 1;
  const progress = xp % 1000;

  const milestones = [
    { name: "First ₹1000 Saved", achieved: currentSaved >= 1000 },
    { name: "First Redemption", achieved: totalPoints < 1500 },
    { name: "Uploaded Reel", achieved: xp > 1800 },
    { name: "Reached Level 3", achieved: level >= 3 }
  ];

  const lootOptions = ['Free Lounge Pass', '500 Bonus Points', '10% Off Flight', 'Free Tour Voucher'];

  const redeemReward = (reward) => {
    if (totalPoints >= reward.pointsRequired) {
      setTotalPoints(totalPoints - reward.pointsRequired);
      setRedeemedCode(`TRVL-${Math.floor(1000 + Math.random() * 9000)}`);
      alert(`🎉 Redeemed: ${reward.name}`);
    } else {
      alert('Not enough points');
    }
  };

  const handleDeposit = () => {
    const maxSave = monthlyDeposit * planMonths;
    if (currentSaved + monthlyDeposit <= maxSave) {
      setCurrentSaved(currentSaved + monthlyDeposit);
      setShowPaymentModal(true);
    } else {
      alert("Plan already completed!");
    }
  };

  const handlePaymentConfirmation = () => {
    if (!selectedPaymentMethod) {
      alert('Select a payment method');
    } else {
      alert(` ₹${monthlyDeposit} paid via ${selectedPaymentMethod}`);
      setShowPaymentModal(false);
    }
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleUploadReel = () => {
    if (caption.trim() !== '') {
      const points = 200;
      const newXP = xp + 200;
      setTotalPoints(totalPoints + points);
      setEarnedPoints(earnedPoints + points);
      setXP(newXP);
      setCaption('');
      alert('📹 Reel uploaded! You earned 200 XP and 200 points');
    } else {
      alert("Caption cannot be empty.");
    }
  };

  const unlockLootBox = () => {
    if (level >= 3) {
      const reward = lootOptions[Math.floor(Math.random() * lootOptions.length)];
      setLootReward(reward);
      setShowLoot(true);
    } else {
      alert("Reach Level 3 to unlock loot boxes!");
    }
  };

  return (
    <div className="rewards-container">
      <header className="header">
        <h1> Travel Rewards</h1>
        <p>Save, Earn, and Travel Smarter!</p>
      </header>

      <section className="summary-section">
        <div className="card total-points">
          <h2>Total Points</h2>
          <p>{totalPoints}</p>
        </div>
        <div className="card earned-points">
          <h2>Points This Month</h2>
          <p>{earnedPoints}</p>
        </div>
        <div className="card level-progress">
          <h2>🎮 Level {level}</h2>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${progress / 10}%` }}></div>
          </div>
          <p>{progress}/1000 XP to next level</p>
        </div>
      </section>

      <section className="reel-upload">
        <h2><FaCameraRetro /> Upload Travel Reel</h2>
        <input
          type="text"
          placeholder="Caption your reel..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handleUploadReel}>Upload & Earn</button>
      </section>

      <section className="saving-plan">
        <h2>💰 Start Saving</h2>
        <div className="controls">
          <label>Plan:
            <select value={planMonths} onChange={(e) => setPlanMonths(parseInt(e.target.value))}>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
          </label>
          <label>Monthly Deposit:
            <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(parseInt(e.target.value))} />
          </label>
          <button onClick={handleDeposit}>Deposit ₹{monthlyDeposit}</button>
        </div>
        <div className="progress">
          <p>Saved: ₹{currentSaved} / ₹{planMonths * monthlyDeposit}</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${(currentSaved / (planMonths * monthlyDeposit)) * 100}%` }}></div>
          </div>
        </div>

        {currentSaved >= planMonths * monthlyDeposit && (
          <div className="trip-options">
            <h3>🎉 You unlocked travel plans!</h3>
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
              <h2>🎁 You got: {lootReward}</h2>
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
                <li key={idx}>📌 {step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPaymentModal(false)}>&times;</span>
            <h2>Select Payment Method</h2>
            <label><input type="radio" name="payment" value="UPI" onChange={(e) => setSelectedPaymentMethod(e.target.value)} /> UPI</label>
            <label><input type="radio" name="payment" value="Net Banking" onChange={(e) => setSelectedPaymentMethod(e.target.value)} /> Net Banking</label>
            <button onClick={handlePaymentConfirmation}>Confirm</button>
          </div>
        </div>
      )}

      <section className="badges">
        <h2>🏅 Achievements</h2>
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
