import PropTypes from "prop-types";
import { lotteryBackground } from "../../../images";
import { Button, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Lottery.css"; // <-- Import the CSS file

const Lottery = ({ game, gameCategoryUrl }) => {
  return (
    <div className="lottery-card h-full">
      {game.gameUrl ? (
        <Link to={`${gameCategoryUrl}/${game.gameUrl}`}>
          <img
            src={lotteryBackground}
            alt="Lottery Background"
            className="lottery-background h-full aspect-auto transform scale-[1.7]"
          />

          <Typography
            className="lottery-title flex justify-center"
            sx={{
              fontSize: game.id === 1.4 ? "16px" : "20px",
              fontWeight: 600,
            }}
          >
            {game.text}
          </Typography>

          <img
            src={game.img}
            alt="Game"
            className="lottery-image"
          />

          <Button
            className="lottery-button"
            sx={{
              fontWeight: 600,
            }}
          >
            Go
            <ArrowForwardIos
              sx={{ fontSize: "12px", marginBottom: "3px", marginLeft: "3px" }}
            />
          </Button>
        </Link>
      ) : (
        <div className="lottery-card-content">
          <img
            src={lotteryBackground}
            alt="Lottery Background"
            className="lottery-background h-full aspect-auto transform scale-[1.7]"
          />

          <Typography
            className="lottery-title flex justify-center"
            sx={{
              fontSize: game.id === 1.4 ? "16px" : "20px",
              fontWeight: 600,
            }}
          >
            {game.text}
          </Typography>

          <img
            src={game.img}
            alt="Game"
            className="lottery-image"
          />

          <Button
            className="lottery-button w-[80%]"
            sx={{
              fontWeight: 600,
            }}
            disabled
          >
            Coming Soon
          </Button>
        </div>
      )}
    </div>
  );
};

Lottery.propTypes = {
  gameCategoryUrl: PropTypes.string.isRequired,
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    gameUrl: PropTypes.string, // No longer required, can be null or undefined
  }).isRequired,
};

export default Lottery;
