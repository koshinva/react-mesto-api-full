import { BASE_URL } from './base.url';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Ошибка: ${resp.status}`);
  };
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  };

  getCardInfo = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  };

  editProfile = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  };

  addNewCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  };

  deleteCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  };

  changeLikeCard = (id, statusLike) => {
    if (statusLike) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
        credentials: 'include',
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      }).then(this._checkResponse);
    }
  };

  updateAvatar = (urlAvatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: urlAvatar,
      }),
    }).then(this._checkResponse);
  };

}
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
export default api;
