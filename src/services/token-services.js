class TokenService {
    getUserName() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.userName;
    }
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.jwt;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("lucky-game-user"));
        user.jwt = token;
        localStorage.setItem("lucky-game-user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("lucky-game-user"));
    }

    getUserId() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.id;
    }

    setUser(user) {

        localStorage.setItem("lucky-game-user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("lucky-game-user");
        localStorage.removeItem("confirmation-modal")
    }

    getUserTheme() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.userPreferences.theme;
    }

    setUserTheme(theme) {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        user.userPreferences.theme = theme;
        localStorage.setItem("lucky-game-user", JSON.stringify(user));
    }

    getUserBackgroundSound() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.userPreferences.backgroundVolume;
    }

    setUserBackgroundSound(backgroundSound) {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        user.userPreferences.backgroundVolume = backgroundSound;
        localStorage.setItem("lucky-game-user", JSON.stringify(user));
    }

    getUserGameSound() {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        return user?.userPreferences.effectsVolume;
    }

    setUserGameSound(gameSound) {
        const user = JSON.parse(localStorage.getItem("lucky-game-user"));
        user.userPreferences.effectsVolume = gameSound;
        localStorage.setItem("lucky-game-user", JSON.stringify(user));
    }
}

export default new TokenService();