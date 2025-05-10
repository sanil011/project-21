import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Aviator, HeadTails, PushpaRani, Wingo } from "../../components";
import Dice from "../../components/games/Dice/Dice";

const Game = () => {
  const [gameName, setGameName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const name = location.pathname.split("/")[3];
    setGameName(name.charAt(0).toUpperCase() + name.slice(1));
  }, [location.pathname]);
  // Show loading text while determining gameName
  if (!gameName) {
    return (
      <div className="text-white text-center mt-10 text-lg animate-pulse">
        Loading game...
      </div>
    );
  }
  switch (gameName) {
    case "Aviator":
      return <Aviator />;
    case "Heads-and-tails":
      return <HeadTails />;
    case "Wingo-lottery":
      return <Wingo />;
    case "Dice":
      return <Dice />;
    // case "Mines-land":
    //   return <MinesLand />;
    // case "Ballon":
    //   return <Ballon />;
    case "Pushpa":
      return <PushpaRani />;
    default:
      return (
        <div className="text-3xl font-semibold underline text-white">
          {gameName} Game
        </div>
      );
  }
};

export default Game;
