export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate().querySelector(".card");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    return template.content.cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle("card__like-button_liked");
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    return this._element;
  }
}
