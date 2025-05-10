import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGameInfo } from "../../../../utils/diceApi";
import { SET_DICE_GAME_INFO } from "../../../../store";

const useGetCurrentGameDetails = () => {
    const dispatch = useDispatch();
  
    const [interval, setIntervalValue] = useState(null);


    useEffect(() => {
        if (interval) {
            clearInterval(interval);
        }
        let tempInterval = setInterval(() => getDiceGameInfo(dispatch), 1000);
        setIntervalValue(tempInterval);
        return () => {
            clearInterval(tempInterval);
        };
    }, []);

    return null;
};

export default useGetCurrentGameDetails;



const getDiceGameInfo = async (dispatch) => {
    const response = await getGameInfo({ game: "DICE" });
    if (response) dispatch({ type: SET_DICE_GAME_INFO, payload: response });
};
