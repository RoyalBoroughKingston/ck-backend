import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_TOKEN_URI
});

class Auth {
  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  async login(email, password) {
    const response = await http.post("/oauth/token", {
      grant_type: "password",
      username: email,
      password,
      client_id: process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET
    });
    return this.storeTokens(response.data);
  }

  /**
   * @returns {String}
   */
  async refreshAccessToken() {
    const { data } = await http.post("/oauth/token", {
      grant_type: "refresh_token",
      refresh_token: this.refreshToken,
      client_id: process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET
    });

    if (data.hasOwnProperty("error")) {
      this.logout();
      throw new Error(data);
    }

    this.storeTokens(data);

    return this.accessToken;
  }

  /**
   * @param {object} tokens
   * @returns {boolean}
   */
  storeTokens(tokens) {
    localStorage.setItem(
      "oauth",
      JSON.stringify({
        expires_at: tokens.expires_in * 1000 + Date.now(),
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      })
    );

    return true;
  }

  /**
   * @return {boolean}
   */
  logout() {
    localStorage.removeItem("oauth");

    return true;
  }

  /**
   * @returns {boolean}
   */
  get hasExpired() {
    return Date.now() > this.expiresAt;
  }

  /**
   * @returns {object|null}
   */
  get oauth() {
    return JSON.parse(localStorage.getItem("oauth"));
  }

  /**
   * @returns {number}
   */
  get expiresAt() {
    return this.oauth ? this.oauth.expires_at : null;
  }

  /**
   * @returns {string|null}
   */
  get accessToken() {
    return this.oauth ? this.oauth.access_token : null;
  }

  /**
   * @returns {string|null}
   */
  get refreshToken() {
    return this.oauth ? this.oauth.refresh_token : null;
  }

  /**
   * @returns {boolean}
   */
  get isLoggedIn() {
    return this.accessToken && !this.hasExpired;
  }
}

export default new Auth();
