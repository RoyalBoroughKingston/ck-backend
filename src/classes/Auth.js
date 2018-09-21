import axios from "axios";

class Auth {
  /**
   * Constructor.
   */
  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_TOKEN_URI
    });
  }

  get authorizeUrl() {
    return `${process.env.VUE_APP_API_OAUTH_AUTHORIZE_URI}?client_id=${
      process.env.VUE_APP_API_CLIENT_ID
    }&redirect_uri=${encodeURI(
      process.env.VUE_APP_URI + "/login"
    )}&response_type=token`;
  }

  /**
   * Parses the URL and returns query string parameters as an object.
   *
   * @param {String} url
   * @returns {Object}
   */
  parseQueryString(url) {
    let query = url.substring(url.indexOf("#") + 1);

    let e,
      a = /\+/g, // Regex for replacing addition symbol with a space
      r = /([^&;=]+)=?([^&;]*)/g,
      d = function(s) {
        return decodeURIComponent(s.replace(a, " "));
      },
      q = query,
      urlParams = {};

    /* jshint ignore:start */
    while ((e = r.exec(q))) {
      urlParams[d(e[1])] = d(e[2]);
    }
    /* jshint ignore:end */

    return urlParams;
  }

  /**
   * Redirects the user the authorization URL.
   */
  redirect() {
    window.location.href = this.authorizeUrl;
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  login(accessToken, expiresIn) {
    localStorage.setItem(
      "oauth",
      JSON.stringify({
        expires_at: expiresIn * 1000 + new Date().setHours(24, 0, 0, 0),
        access_token: accessToken
      })
    );
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
    return this.oauth !== null ? this.oauth.expires_at : null;
  }

  /**
   * @returns {string|null}
   */
  get accessToken() {
    return this.oauth ? this.oauth.access_token : null;
  }

  /**
   * @returns {boolean}
   */
  get isLoggedIn() {
    return (
      this.accessToken !== null && this.expiresAt !== null && !this.hasExpired
    );
  }
}

export default new Auth();
