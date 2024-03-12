export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputInvalidClass = settings.inputInvalidClass;
    this._formElement = formElement;

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _hideAllErrors() {
    const errorElements = Array.from(
      this._formElement.querySelectorAll(`.${this._inputErrorClass}`)
    );
    errorElements.forEach((errorElement) => {
      this._hideInputError(errorElement);
    });
  }

  _validateInput(input) {
    const errorElement = input.parentElement.querySelector(
      `.${this._inputErrorClass}`
    );
    if (!input.validity.valid) {
      this._showInputError(errorElement, input.validationMessage, input);
    } else {
      this._hideInputError(errorElement, input);
    }
  }

  _showInputError(errorElement, message, input) {
    errorElement.textContent = message;
    errorElement.classList.add(this._errorClass);
    if (input) {
      input.classList.add(this._inputInvalidClass);
    }
  }

  _hideInputError(errorElement, input) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    if (input) {
      input.classList.remove(this._inputInvalidClass);
    }
  }

  _toggleButtonState() {
    const isValid = this._inputs.every((input) => input.validity.valid);
    if (isValid) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _enableButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  _disableButton() {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    if (this._submitButton) {
      this._disableButton();
    }
  }
}
