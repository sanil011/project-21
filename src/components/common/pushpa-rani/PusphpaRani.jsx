import { useState } from 'react'
import BettingSection from './components/BettingSection'
import UnityGame from './UnityGame'
import './PushpaRani.css'
import PropTypes from "prop-types"
import MultiplierHistory from './components/pushpa-multiplier-history/PushpaMultiplier'
import BettingHistory from './components/BettingHistory'


const PushpaRani = () => {
  const [isPlaneCrashed, setIsPlaneCrashed] = useState(false); // To toggle crashing state
  const [lerp,setLerp] = useState(0);
  const betOptions = [10, 100, 500, 1000];

  //error text 
  const [errorMessage, setErrorMessage] = useState(null);
  const [winMessage, setWinMessage] = useState(null);

  const [allBets, setAllBets] = useState([]);
  const [totalBets, setTotalBets] = useState(0);


  return (
    <div className="desktop-wrapper bg-[#360F7A]">
      <div className="app-container">
        <div className="game-container">
          <div className="game-window">
            <MultiplierHistory isPlaneCrashed={isPlaneCrashed} />
            <UnityGame 
            isPlaneCrashed={isPlaneCrashed} 
            setIsPlaneCrashed={setIsPlaneCrashed} 
            setLerp={setLerp}
            setAllBets={setAllBets}
            setTotalBets={setTotalBets}
            />
            {/* to show error or win slideDownEffect */}
            {errorMessage && <div className="pushpa-global-error show">{errorMessage}</div>}
            {winMessage && (<div className="pushpa-win-message show">{winMessage}</div>)}
          </div>
        </div>
        <div className="betting-sections">
          <BettingSection 
          lerp={lerp} 
          isPlaneCrashed={isPlaneCrashed} 
          setErrorMessage={setErrorMessage} 
          setWinMessage={setWinMessage}
          buttonId={1}
          />
          <BettingSection 
          lerp={lerp} 
          isPlaneCrashed={isPlaneCrashed} 
          setErrorMessage={setErrorMessage} 
          setWinMessage={setWinMessage}
          buttonId={2}
          />
        </div>
        <BettingHistory 
        currentBets={allBets} 
        totalBets={totalBets}/>
      </div>
    </div>
  )
}

BettingSection.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PushpaRani
