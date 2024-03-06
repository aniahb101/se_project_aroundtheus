export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setEventListeners();
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_liked");
  }

  _handleTrashIcon() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleTrashIcon();
    });
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  }
}
