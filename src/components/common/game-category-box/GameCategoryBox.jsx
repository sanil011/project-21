import { ArrowForwardIos, LocalFireDepartment } from "@mui/icons-material";
import { GameCard, Lottery } from "../../index";
import { jiliGames, slotsGames } from "../../../data";
import PropTypes from "prop-types";
import { cn } from "../../../utils/utils";


const GameCategoryBox = ({ gameCategory, currentTab, changeTab }) => {
  return (
    <div className="my-3 mx-4">

      <div className="mb-1 w-full flex justify-between items-center">
        <div className="text-white  font-bold flex gap-1">
          {gameCategory.title === "Platform Recommendation" ? (
            <LocalFireDepartment color="primary" />
          ) : (
            <div className="w-2 min-h-5 rounded-full bg-[#61a9ff]"></div>
          )}
          {gameCategory.title}
        </div>
        {currentTab === "Popular" && (


          <button
            className="flex items-center justify-center gap-1 border-[0.5px] px-4 py-0.5 rounded-md text-xs text-gray-300"
            onClick={() => changeTab(gameCategory.title)}
          >
            All{" "}
            <p className="text-blue-400">{gameCategory.title === "Jilli"
              ? jiliGames.length
              : gameCategory.title === "Slots"
                ? slotsGames.length
                : gameCategory.totalGames}</p>
            <ArrowForwardIos
              sx={{ color: "#636367", fontSize: "10px" }}
            />
          </button>

        )}
      </div>

      <div
        className={cn('grid gap-3', gameCategory.title === "Lottery" ? "grid-cols-2" : "grid-cols-3")}
      >
        {currentTab === "Jilli"
          ? jiliGames.map((game) => (
            <GameCard key={game.id} game={game} title={gameCategory.title} />
          ))
          : currentTab === "Slots"
            ? slotsGames.map((game) => (
              <GameCard key={game.id} game={game} title={gameCategory.title} />
            ))
            : gameCategory.games.map((game) =>
              gameCategory.title === "Lottery" ? (
                <Lottery
                  key={game.id}
                  game={game}
                  gameCategoryUrl={gameCategory.gameCategoryUrl}
                />
              ) : (
                <GameCard
                  key={game.id}
                  game={game}
                  title={gameCategory.title}
                  gameCategoryUrl={gameCategory.gameCategoryUrl}
                />
              )
            )}
      </div>

    </div>
  );
};

GameCategoryBox.propTypes = {
  currentTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
  gameCategory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    gameCategoryUrl: PropTypes.string.isRequired,
    totalGames: PropTypes.number.isRequired,
    games: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
  children: PropTypes.arrayOf,
};

export default GameCategoryBox;
