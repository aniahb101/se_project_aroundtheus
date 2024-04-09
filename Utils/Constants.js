export const initialCards = [
  {
    name: "Ferris Wheel",
    link: "https://images.unsplash.com/photo-1700433158968-b1abf25bb8f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Air Ballon",
    link: "https://images.unsplash.com/photo-1559926223-e70036a18ceb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Falls Creek",
    link: "https://images.unsplash.com/photo-1551675705-72513c2722a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Old Mill",
    link: "https://images.unsplash.com/photo-1618577201585-3afa2ec882b1?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cayon",
    link: "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fusine Lake",
    link: "https://plus.unsplash.com/premium_photo-1669239113599-f51b76587dc9?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__invalid",
  errorClass: "modal__invalid_active",
  inputInvalidClass: "modal__text_invalid",
};

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const editModalTitleInput = document.querySelector("#title-textbox");
export const editModalSubtitleInput =
  document.querySelector("#subtitle-textbox");
export const addCardClose = document.querySelector("#add-modal-close");
export const addCardTitleInput = document.querySelector("#card-title-textbox");
export const addCardUrlInput = document.querySelector("#card-subtitle-textbox");
export const profileAddedForm = document.forms["add-form"];
export const profileForm = document.forms["modal-form"];
