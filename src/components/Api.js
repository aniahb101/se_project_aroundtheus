export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error fetching initial cards:", error);
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }

  updateProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error adding card:", error);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error liking card:", error);
      });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error removing like from card:", error);
      });
  }

  updateAvatar({ link }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }
}
