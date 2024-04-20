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
        name: name,
        about: about,
      }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error adding card:", error);
      });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  }

  cardLike(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error(`Error ${isLiked ? "removing" : "liking"} card:`, error);
      });
  }

  updateAvatar({ link }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: link }),
    })
      .then(this._checkServerResponse)
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }
}
