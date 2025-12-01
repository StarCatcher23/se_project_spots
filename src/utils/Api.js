// utils/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // called getuserinfo in this array
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "26822020-7537-483b-afd6-df8a444cb04a",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
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

  //sent a request using the PATCH method:
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } //handled response
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default Api;
