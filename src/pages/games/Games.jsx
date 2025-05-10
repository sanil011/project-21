import { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { gameCategories, jiliGames, slotsGames } from "../../data";
import { GameCard, Lottery } from "../../components";
import { Link } from "react-router-dom";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          className={`grid ${
            index === 0 ? "grid-cols-2" : "grid-cols-3"
          } gap-3 p-3`}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.element,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Games = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="text-white">
      <AppBar position="sticky" sx={{ backgroundColor: "#22275b" }}>
        <Box className="w-full relative bg-[#2b3270] p-2">
          <Link to="/" className="absolute top-2 left-2">
            <ArrowBackIos />
          </Link>
          <Typography variant="h5" textAlign="center">
            Games
          </Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="games tabs"
        >
          <Tab label="Lottery" sx={{ color: "white" }} {...a11yProps(0)} />
          <Tab label="Virtual" sx={{ color: "white" }} {...a11yProps(1)} />
          <Tab label="Jilli" sx={{ color: "white" }} {...a11yProps(2)} />
          <Tab label="Slots" sx={{ color: "white" }} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {gameCategories[0].games.map((game) => (
          <Lottery
            key={game.id}
            game={game}
            title="Lottery"
            // gameCategoryUrl={gameCategory.gameCategoryUrl}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {gameCategories[1].games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            title="Virtual Games"
            // gameCategoryUrl={gameCategory.gameCategoryUrl}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {jiliGames.map((game) => (
          <GameCard key={game.id} game={game} title="Jilli" />
        ))}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {slotsGames.map((game) => (
          <GameCard key={game.id} game={game} title="Slots" />
        ))}
      </TabPanel>
    </Box>
  );
};

export default Games;
