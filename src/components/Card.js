export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeButtonClick
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    this._cardElement = template.content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this);
    });

    this.cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this.renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  renderLikes() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add("liked");
    } else {
      this._cardLikeButton.classList.remove("liked");
    }
  }

  getView() {
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
    this.renderLikes();

    return this._cardElement;
  }
}
