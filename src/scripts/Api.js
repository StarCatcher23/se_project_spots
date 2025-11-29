// utils/Api.js

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "537eed0e-557c-451f-966a-0b9255783f43",
      },
    }).then((res) => res.json());
  }
  //other methods working with the API
}

export default Api;
