

const initialState = {
    currentGame: {
        id: "",
        gameType: "",
        startTime: undefined,
        durationInMins: 0.0,
        phase: "",
    },
    currentGameHistory: [],
    betHistory: {
        bets: [],
        pagination: {
            total: 0,
            pageSize: 0,
            pageNumber: 1,
        },
    },
    placeBetStatus: "NOT_PLACED",
    selectedGame: "DICE",
    placedBet: [
        {
            id: "",
            betAmount: 0.0,
            betType: "",
            betTime: "",
            odds: "",
        },
    ],
};

const DiceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_DICE_GAME_INFO:
            return {
                ...state,
                currentGame: payload,
            };

        case SET_DICE_GAME_HISTORY:
            return {
                ...state,
                currentGameHistory: payload,
            };

        case SET_DICE_BET_HISTORY:
            return {
                ...state,
                betHistory: payload,
            };

        case SET_DICE_PLACED_BET:
            return {
                ...state,
                placedBet: [...state.placedBet, payload],
            };

        case RESET_DICE_PLACED_BET:
            return {
                ...state,
                placeBetStatus: "NOT_PLACED",
                placedBet: [],
            };

        default:
            return state;
    }
};


export default DiceReducer;

 export const SET_DICE_GAME_INFO = "SET_DICE_GAME_INFO";
 export const SET_DICE_GAME_HISTORY = "SET_DICE_GAME_HISTORY";
 export const SET_DICE_BET_HISTORY = "SET_DICE_BET_HISTORY";
 export const SET_DICE_PLACED_BET = "SET_DICE_PLACED_BET";
 export const RESET_DICE_PLACED_BET = "RESET_DICE_PLACED_BET";
