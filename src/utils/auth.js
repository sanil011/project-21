class AuthService {
  async login(loginData) {
    try {
      const response = await fetch(
        "https://play-247.in/games/rest/v1/user/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed!");
      }

      const data = await response.json();
      return { data, message: "Login successfully", severity: "success" };
    } catch (error) {
      return { message: error.message, severity: "error" };
    }
  }

  async logout() {
    localStorage.removeItem("lucky-game-user");
    localStorage.removeItem("confirmation-modal")
  }

  async checkAuth() {
    const res = JSON.parse(localStorage.getItem("lucky-game-user"));
    return res && res.userName ? res : null;
  }
}

const authService = new AuthService();
export default authService;
