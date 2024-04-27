import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  setConfirm(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(loading) {
    if (loading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "delete";
    }
  }
}
