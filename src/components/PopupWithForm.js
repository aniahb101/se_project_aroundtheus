import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".modal__form");
    this._inputFields = Array.from(
      this._form.querySelectorAll(".modal__text-input")
    );
    this._submitButton = this._form.querySelector(".modal__button");
  }

  _getInputValues() {
    const values = {};
    this._inputFields.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  reset() {
    this._form.reset();
  }

  renderLoading(loading) {
    if (loading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.reset();
    });
  }
}
