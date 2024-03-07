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
    this._addModalPreview();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
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

  _addModalPreview() {
    this._cardImage.addEventListener("click", () => {
      this._modalImage.src = this._link;
      this._modalImage.alt = this._name;
      this._modalSubtitle.textContent = this._name;
      openPopup(modalPreview);
    });
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    const titleElement = this._element.querySelector(".card__title");
    titleElement.textContent = this._name;

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleTrashIcon();
    });

    return this._element;
  }
}
