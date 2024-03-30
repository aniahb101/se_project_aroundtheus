import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".modal__form");
    this._inputFields = Array.from(
      this._form.querySelectorAll(".modal__text-input")
    );
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
    // the review comment that was sent got lost and would not popup for this section so i couldnt see what needed to be fixed
    //i will remove these comments when it gets checked again i had to try to remember what was said by memory
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
