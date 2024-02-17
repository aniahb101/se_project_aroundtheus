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

  const profileEditButton = document.querySelector(".profile__edit-button");
  if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
      hideAllErrors(forms, config);
    });
  }
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
    showInputError(errorElement, input.validationMessage, config);
    input.classList.add("modal__text_invalid");
  } else {
    hideInputError(errorElement, config);
    input.classList.remove("modal__text_invalid");
  }
}

function showInputError(errorElement, message, config) {
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add(config.errorClass);
  }
}

function hideInputError(errorElement, config) {
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}

function toggleButtonState(inputs, submitButton, config) {
  const isValid = inputs.every((input) => input.validity.valid);
  if (submitButton) {
    if (isValid) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(config.inactiveButtonClass);
    } else {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.add(config.inactiveButtonClass);
    }
  }
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__invalid",
  errorClass: "modal__invalid_active",
};

enableValidation(config);
