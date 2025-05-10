import { useEffect, useState } from 'react';
import api from "../../../../services/api"
const BettingHistory = ({ currentBets, totalBets }) => {
  const [activeTab, setActiveTab] = useState('allBets');

  // State to store the bets data
  const [myBets, setMyBets] = useState([]);
  const [error, setError] = useState(null);  // Error state

  // Fetch the bets data when the component mounts
  useEffect(() => {
    const fetchBets = async () => {
      try {
        const { jwt } = JSON.parse(localStorage.getItem("lucky-game-user"));
        // Replace with your actual API endpoint
        const response = await api.get("/gamma/lucky9/getUserAviatorHistory?gameName=pushpa")

        if (response.status !== 200) {
          throw new Error("Failed to fetch bets data");
        }

        // Parse the response to JSON
        const data = response.data;

        // Update the state with the fetched data
        setMyBets(data);
      } catch (error) {
        // Handle any error that occurs during the fetch
        setError(error.message);
      }
    };

    // Call the fetch function
    fetchBets();
  }, [currentBets]); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="betting-history">
      <div className="history-tabs">
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'allBets' ? 'active' : ''}`}
            onClick={() => setActiveTab('allBets')}
          >
            All Bets
          </button>
          <button
            className={`tab ${activeTab === 'myBets' ? 'active' : ''}`}
            onClick={() => setActiveTab('myBets')}
          >
            My Bets
          </button>
        </div>
      </div>

      <div className="bets-container">
        {activeTab === 'allBets' ? (
          // All Bets View
          <div className="h-[500px] overflow-hidden">
            <div className="bets-header">
              <div className="total-bets-section">
                <div className="total-bets-header">
                  <span>ALL BETS</span>
                </div>
                <div className="total-amount">{totalBets.toFixed(2)}</div>
                <div className="divider"></div>
              </div>
              <div className="bets-columns">
                <span className="text-sm text-[#FDBE02] pl-2">User</span>
                <span className="text-sm text-[#FDBE02] text-center">Bet, ₹</span>
                <span className="text-sm text-[#FDBE02] text-center">X</span>
                <span className="text-sm text-[#FDBE02] text-right pr-2">Cash out, ₹</span>
              </div>
            </div>

            <div className="custom-scrollbar-color | flex flex-col gap-0.5 py-1 bg-[#DB159D] rounded-xl h-[380px] overflow-auto border-4 border-[#3F0363]">
              {currentBets.map((bet) => (
                <div key={bet.userName + bet.buttonId} className={`bet-row ${bet.ifEncashed ? 'won' : ''}`}>
                  <div className="flex items-center gap-1 h-full text-sm bg-[#3F0363] text-[#00FAF3] pl-2 rounded-l-lg py-1">
                    <img src={"-"} alt="avatar" className="avatar" />
                    <span>{bet.userName}</span>
                  </div>
                  <span className="h-full flex items-center justify-center bg-[#3F0363] text-[#00FAF3] text-sm py-1">
                    {bet.amount}
                  </span>
                  <span className="h-full flex items-center justify-center text-sm bg-[#3F0363] text-[#00FAF3] py-1">
                    {bet.multiplier}x
                  </span>
                  <span className="h-full flex items-center justify-end text-sm bg-[#3F0363] text-[#00FAF3] pr-2 rounded-r-lg py-1">
                    {bet.encashedAmount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // My Bets View
          <div className="h-[500px] overflow-scroll">
            <div className="bets-header">
              <div className="bets-columns my-bets-columns">
                <span className="text-sm text-[#FDBE02] pl-2">Date</span>
                <span className="text-sm text-[#FDBE02] text-center">Bet-₹</span>
                <span className="text-sm text-[#FDBE02] text-center">X</span>
                <span className="text-sm text-[#FDBE02] text-right pr-2">Cash out-₹</span>
              </div>
            </div>
            <div className="bets-list | custom-scrollbar-color | h-[470px] overflow-auto border-4 border-[#3F0363]">
              {myBets.map((bet, idx) => {
                // Extract the components from placedAt
                const placedAt = bet.placedAt;
                const hours = placedAt[3];
                const minutes = placedAt[4];
                const day = placedAt[2];
                const month = placedAt[1];
                const year = placedAt[0];

                // Format the date and time
                const formattedTime = `${hours}:${minutes}`;
                const formattedDate = `${day}-${month}-${year}`;

                return (
                  <div key={bet.betId} className="h-[40px] flex items-center justify-between w-full">
                    {/* Display formatted time and date on different lines */}
                    <span className="h-full w-[25%] flex items-center justify-start text-sm bg-[#3F0363] text-[#00FAF3] pl-2 rounded-l-lg py-1">
                      {formattedTime} <br /> {formattedDate}
                    </span>
                    <span className="h-full w-[25%] flex items-center justify-center bg-[#3F0363] text-[#00FAF3] text-sm text-center py-1">
                      {bet.amount}
                    </span>
                    <span className="h-full w-[24%] flex items-center justify-center text-sm bg-[#3F0363] text-[#00FAF3] text-center py-1">
                      {bet.encashedMultiplier}x
                    </span>
                    <span className="h-full w-[25%] flex items-center justify-end text-sm bg-[#3F0363] text-[#00FAF3] pr-2 rounded-r-lg py-1">
                      {bet.encahsedAmount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingHistory;
