import axios from "axios";

class Auth {
  /**
   * Constructor.
   */
  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_URI
    });
  }

  get authorizeUrl() {
    return `${process.env.VUE_APP_API_URI}/oauth/authorize?client_id=${
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
    // OAuth tokens.
    localStorage.setItem(
      "oauth",
      JSON.stringify({
        expires_at: expiresIn * 1000 + new Date().setHours(24, 0, 0, 0),
        access_token: accessToken
      })
    );

    // User details.
    await this.fetchUser();

    // Last active.
    this.invokeActivity();
  }

  async fetchUser() {
    const { data } = await this.http.get("/core/v1/users/user", {
      params: { include: "user-roles" },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    localStorage.setItem("user", JSON.stringify(data.data));
  }

  /**
   * @return {boolean}
   */
  logout() {
    localStorage.removeItem("oauth");
    localStorage.removeItem("user");
    localStorage.removeItem("last_active");

    return true;
  }

  /**
   * Clears the user's sessions on the API.
   */
  async clearSessions() {
    await this.http.delete("/core/v1/users/user/sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  /**
   * Touches the last_active timestamp.
   */
  invokeActivity() {
    localStorage.setItem("last_active", Date.now());
  }

  /**
   * Determines if the user session is inactive.
   * @param {number} time
   * @returns {boolean}
   */
  inactive(minutes = process.env.VUE_APP_SESSION_TIMEOUT) {
    const milliseconds = minutes * 60 * 1000;

    if (this.lastActive === null) {
      return true;
    }

    return Date.now() - this.lastActive > milliseconds;
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
   * @returns {object|null}
   */
  get lastActive() {
    return JSON.parse(localStorage.getItem("last_active"));
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
   * @param {string} roleName
   * @param {object} service
   * @param {object} organisation
   * @returns {boolean}
   */
  hasRole(roleName, service = null, organisation = null) {
    if (this.user === null) {
      return false;
    }

    return (
      this.user.roles.find(role => {
        if (role.role !== roleName) {
          return false;
        }

        if (service !== null && role.service_id !== service.id) {
          return false;
        }

        if (organisation !== null && role.organisation_id !== organisation.id) {
          return false;
        }

        return true;
      }) !== undefined
    );
  }

  /**
   * @returns {boolean}
   */
  get isSuperAdmin() {
    return this.hasRole("Super Admin");
  }

  /**
   * @returns {boolean}
   */
  get isGlobalAdmin() {
    return this.hasRole("Global Admin") || this.isSuperAdmin;
  }

  /**
   * @returns {boolean}
   */
  isOrganisationAdmin(organisation = null) {
    return (
      this.hasRole("Organisation Admin", null, organisation) ||
      this.isGlobalAdmin
    );
  }

  /**
   * @returns {boolean}
   */
  isServiceAdmin(service = null) {
    return (
      this.hasRole("Service Admin", service) ||
      this.isOrganisationAdmin(service !== null ? service.organisation : null)
    );
  }

  /**
   * @returns {boolean}
   */
  isServiceWorker(service = null) {
    return (
      this.hasRole("Service Worker", service) || this.isServiceAdmin(service)
    );
  }
}

export default new Auth();
