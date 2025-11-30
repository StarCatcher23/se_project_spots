// utils/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Generic method to fetch data from any endpoint
  _getData(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // TODO-create another method like getuserinfo only need to change baseurls and we specify for all the endpoints
  getUserInfo() {
    return this._getData("users/me");
  }

  getInitialCards() {
    return this._getData("cards");
  }

  // TODO-call getuserinfo in this array
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default Api;
