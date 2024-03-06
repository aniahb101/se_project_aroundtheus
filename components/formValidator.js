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
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const isValid = inputs.every((input) => input.validity.valid);
    if (submitButton) {
      if (isValid) {
        this._enableButton(submitButton);
      } else {
        this._disableButton(submitButton);
      }
    }
  }

  _enableButton(button) {
    button.removeAttribute("disabled");
    button.classList.remove(this._inactiveButtonClass);
  }

  _disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add(this._inactiveButtonClass);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (submitButton) {
      this._disableButton(submitButton);
    }
  }
}
