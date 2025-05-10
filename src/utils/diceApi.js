import api from "../services/api"

export const getGameInfo = async ({ game = "HEAD_TAIL" }) => {
    try {
        const response = await api.get(`/api/v1/virtual-games/currentGame/${game}`);
        return response.data
    }
    catch (err) {
        console.log(err)   
    }
};

export const submitBet = async (betData) => {
    try {
        const response = await api.post(
            `/api/v1/virtual-games/submitBet`,
            betData
        );

        return { ...response.data, message: "Bet placed successfully" };
    } catch (error) {
        if (error.message.includes("Token expired")) {
            return { message: "Token Expired, Login", severity: "error" };
        }
        return { message: error.message, severity: "error" };
    }
}

export const getCurrentGameResultAPI = async ({
    size = 5,
    game = "HEAD_TAIL",
}) => {
    const payload = { size };
    const urlSearchParams = new URLSearchParams(payload);
    try {
        const response = await api.get(`/gamma/lucky9/getLatestResults/${game}?${urlSearchParams}`);
        return response.data;
    } catch (err) {
        console.log(err)
    }
};

export const getBetHistoryAPI = async (payload) => {
    const { game = "HEAD_TAIL", ...rest } = payload;
    const urlSearchParams = new URLSearchParams(rest);
    try {
        const response = await api.get(`/gamma/lucky9/bet-history/${game}?${urlSearchParams}`)
        return response.data;
    } catch (err) {
        console.log(err)
    }
};