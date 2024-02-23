function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(input, config);
        toggleButtonState(inputs, submitButton, config);
      });
    });
  });
}

function hideAllErrors(forms, config) {
  forms.forEach((form) => {
    const errorElements = form.querySelectorAll(`.${config.inputErrorClass}`);
    errorElements.forEach((errorElement) => {
      hideInputError(errorElement, config);
    });
  });
}

function validateInput(input, config) {
  const errorElement = input.parentElement.querySelector(
    `.${config.inputErrorClass}`
  );
  if (!input.validity.valid) {
    showInputError(errorElement, input, input.validationMessage, config);
  } else {
    hideInputError(errorElement, input, config);
  }
}

function showInputError(errorElement, input, message, config) {
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
  if (input) {
    input.classList.add(config.inputInvalidClass);
  }
}

function hideInputError(errorElement, input, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
  if (input) {
    input.classList.remove(config.inputInvalidClass);
  }
}

function isFormValid(inputs) {
  return inputs.every((input) => input.validity.valid);
}

function toggleButtonState(inputs, submitButton, config) {
  const isValid = isFormValid(inputs);

  if (submitButton) {
    if (isValid) {
      enableButton(submitButton, config);
    } else {
      disableButton(submitButton, config);
    }
  }
}

function enableButton(button, config) {
  button.removeAttribute("disabled");
  button.classList.remove(config.inactiveButtonClass);
}

function disableButton(button, config) {
  button.setAttribute("disabled", true);
  button.classList.add(config.inactiveButtonClass);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__invalid",
  errorClass: "modal__invalid_active",
  inputInvalidClass: "modal__text_invalid",
};

enableValidation(config);
