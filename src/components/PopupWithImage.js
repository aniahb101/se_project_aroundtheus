import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__image");
    this._caption = this._popup.querySelector(".modal__image-subtitle");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = `Photo of ${data.name}`;
    this._caption.textContent = data.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
