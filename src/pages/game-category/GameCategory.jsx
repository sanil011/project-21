import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GameCategory = () => {
  const [gameCategory, setGameCategory] = useState("");

  const location = useLocation();

  useEffect(() => {
    const category = location.pathname.split("/")[2];
    setGameCategory(category.charAt(0).toUpperCase() + category.slice(1));
  }, [location.pathname]);
  
  return (
    <div className="text-3xl font-semibold underline text-white">
      {gameCategory} Game Category
    </div>
  );
};

export default GameCategory;
