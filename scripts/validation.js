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
        validateInput(input);
        toggleButtonState(inputs, submitButton);
      });
    });
  });

  const profileEditButton = document.querySelector(".profile__edit-button"); // Replace with your button selector
  profileEditButton.addEventListener("click", () => {
    hideAllErrors(forms);
  });
}

function hideAllErrors(forms) {
  forms.forEach((form) => {
    const errorElements = form.querySelectorAll(`.${config.inputErrorClass}`);
    errorElements.forEach((errorElement) => {
      hideInputError(errorElement, config);
    });
  });
}

function validateInput(input) {
  const errorElement = input.parentElement.querySelector(
    `.${config.inputErrorClass}`
  );
  if (!input.validity.valid) {
    showInputError(errorElement, input.validationMessage, config);
  } else {
    hideInputError(errorElement, config);
  }
}

function showInputError(errorElement, message, config) {
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, submitButton) {
  const isValid = inputs.every((input) => input.validity.valid);
  if (isValid) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(config.inactiveButtonClass);
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
