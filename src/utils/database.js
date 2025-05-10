import api from "../services/api";

class DatabaseService {
  async submitBet(betData) {
    try {
      const response = await api.post("/api/v1/virtual-games/submitBet", betData);
      const data = response.data;
      
      if (data && data.gameId) {
        return { ...data, message: "Bet placed successfully" };
      } else {
        return { message: "Bet placement failed", severity: "error" };
      }
    } catch (error) {
      if (error.message.includes("Token expired")) {
        return { message: "Token Expired, Login", severity: "error", error: true };
      }
      return { message: "TRY AGAIN", severity: "error", error: true };
    }
  }

  async getCurrentGame(gameType) {
    try {
      const response = await api.get(`api/v1/virtual-games/currentGame/${gameType}`)

      const data = response.data;
      const timerDuration = Number(gameType.split("LUCKY_9_")[1]);
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - data.startTime) / 1000);
      const remainingTime = timerDuration - elapsedTime;
      return { ...data, remainingTime };
    } catch (error) {
      if (error.message.includes("Token expired")) {
        return { message: "Token Expired, Login", severity: "error" };
      }
      return { message: error.message, severity: "error" };
    }
  }

  async getLatestResults(gameType) {
    try {

      const response = await api.get(`/gamma/lucky9/getLatestResults/${gameType}?size=10`)

      const data = response.data;
      return { data };
    } catch (error) {
      if (error.message.includes("Token expired")) {
        return { message: "Token Expired, Login", severity: "error" };
      }
      return { message: error.message, severity: "error" };
    }
  }

  async getBetHistory(gameType) {
    try {
      const response = await api.get(`/gamma/lucky9/bet-history/${gameType}?pageSize=10&PageNumber=1`);
      const data = response.data;
      return { data: data.bets };
    } catch (error) {
      if (error.message.includes("Token expired")) {
        return { message: "Token Expired, Login", severity: "error" };
      }
      return { message: error.message, severity: "error" };
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
