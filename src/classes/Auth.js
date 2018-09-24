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
  async login(accessToken, expiresIn) {
    localStorage.setItem(
      "oauth",
      JSON.stringify({
        expires_at: expiresIn * 1000 + new Date().setHours(24, 0, 0, 0),
        access_token: accessToken
      })
    );

    const { data } = await this.http.get(
      `${process.env.VUE_APP_API_URI}/users/user`,
      {
        params: { include: "user-roles" },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    localStorage.setItem("user", JSON.stringify(data.data));
  }

  /**
   * @return {boolean}
   */
  logout() {
    localStorage.removeItem("oauth");
    localStorage.removeItem("user");

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
   * @returns {object|null}
   */
  get user() {
    return JSON.parse(localStorage.getItem("user"));
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

  /**
   * @returns {boolean}
   */
  get isSuperAdmin() {
    return (
      this.user !== null &&
      this.user.roles.find(role => role.role === "Super Admin") !== undefined
    );
  }

  /**
   * @returns {boolean}
   */
  get isGlobalAdmin() {
    return (
      this.user !== null &&
      this.user.roles.find(role => role.role === "Global Admin") !== undefined
    );
  }

  /**
   * @returns {boolean}
   */
  isOrganisationAdmin(organisation = null) {
    if (organisation === null) {
      return (
        this.user !== null &&
        this.user.roles.find(role => role.role === "Organisation Admin") !==
          undefined
      );
    }

    return (
      this.user !== null &&
      this.user.roles.find(role => {
        return (
          (role.role === "Organisation Admin") !== undefined &&
          role.organisation_id === organisation.id
        );
      }) !== undefined
    );
  }

  /**
   * @returns {boolean}
   */
  isServiceAdmin(service = null) {
    if (service === null) {
      return (
        this.user !== null &&
        this.user.roles.find(role => role.role === "Service Admin") !==
          undefined
      );
    }

    return (
      this.user !== null &&
      this.user.roles.find(role => {
        return (
          (role.role === "Service Admin") !== undefined &&
          role.service_id === service.id
        );
      }) !== undefined
    );
  }

  /**
   * @returns {boolean}
   */
  isServiceWorker(service = null) {
    if (service === null) {
      return (
        this.user !== null &&
        this.user.roles.find(role => role.role === "Service Worker") !==
          undefined
      );
    }

    return (
      this.user !== null &&
      this.user.roles.find(role => {
        return (
          (role.role === "Service Worker") !== undefined &&
          role.service_id === service.id
        );
      }) !== undefined
    );
  }
}

export default new Auth();
