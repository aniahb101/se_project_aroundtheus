export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    console.log(handleImageClick);
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._getTemplate();

    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this.cardTitleElement = this._cardElement.querySelector(".card__title");
    this.cardImageElement = this._cardElement.querySelector(".card__image");

    this.cardTitleElement.textContent = this._name;
    this.cardImageElement.src = this._link;
    this.cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    this._cardElement = template.content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this.cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._cardElement, {
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("liked");
  }
}
