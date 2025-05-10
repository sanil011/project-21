import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../../../services/api"

const GameCard = ({ game, title, gameCategoryUrl }) => {

  const redirectToUrl = (url) => {
    if (url && url.startsWith("http")) {
      window.open(url, "_blank"); // Open URL in a new tab
    } else {
      console.error("Invalid URL:", url);
    }
  };
  
  const fetchGameData = async (gameId) => {
    try {
      const response = await api.get(`gamma/lucky9/getCasinoGameUrl`, {
        params: { gameId },
      });
  
      // Assuming the response is a URL (as string)
      const rawResponse = response.data;
  
      if (rawResponse.startsWith("http")) {
        redirectToUrl(rawResponse);
        console.log("Casino Game URL:", rawResponse);  // This is your URL string
      } else {
        console.error("Unexpected response:", rawResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    // Log game id only for "Jilli" or "Slots"
    if (title === "Jilli" || title === "Slots") {
      console.log("Game ID:", game.id);
      fetchGameData(game.id);
    }
  };

  return (
    <div
      className={`h-full ${
        title === "Virtual Games" && game.id === 1.3
          ? "rounded-4xl"
          : game.id === 1.5
          ? "rounded-4xl"
          : title === "Slots"
          ? "rounded-4xl"
          : title === "Jilli"
          ? ""
          : "rounded-xl"
      } overflow-hidden`}
    >
      {game.gameUrl ? (
        <Link to={`${gameCategoryUrl}/${game.gameUrl}`} onClick={handleClick}>
          <div className="bg-[#2aa2f3] rounded-xl h-full w-full">
            <img src={game.img} alt="Game Image"    className="h-full w-full aspect-auto transform scale-[1.05]"/>
          </div>
        </Link>
      ) : (
        <div className="bg-[#2aa2f3] rounded-xl h-40" onClick={handleClick}>
          <img src={game.img} alt="Game Image" className="h-full" />
        </div>
      )}

      {title === "Platform Recommendation" && (
        <div className="w-full h-6 bg-white mt-2 rounded-2xl text-white relative">
          <div className="w-[96.5%] h-full bg-blue-400 rounded-2xl pl-2 pt-[2px] text-sm flex justify-between items-center">
            odd of
          </div>
          <span className="absolute right-1 top-[2px] text-sm font-semibold">
            {game.odd}%
          </span>
        </div>
      )}
    </div>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  gameCategoryUrl: PropTypes.string.isRequired,
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    odd: PropTypes.number,
    gameUrl: PropTypes.string,
  }).isRequired,
};

export default GameCard;
