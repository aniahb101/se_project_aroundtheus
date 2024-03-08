import FormValidator from "../components/FormValididator.js";
import Card from "../components/Card.js";

const initialCards = [
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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAddButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".modal");
const editModalTitleInput = document.querySelector("#title-textbox");
const editModalSubtitleInput = document.querySelector("#subtitle-textbox");
const editModalCloseButton = document.querySelector(".modal__close");
const addCardModal = document.querySelector("#profile-add-modal");
const addCardClose = document.querySelector("#add-modal-close");
const addCardTitleInput = document.querySelector("#card-title-textbox");
const addCardUrlInput = document.querySelector("#card-subtitle-textbox");

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__invalid",
  errorClass: "modal__invalid_active",
  inputInvalidClass: "modal__text_invalid",
};

const formElement1 = document.querySelector("#profile-edit-modal");
const formElement2 = document.querySelector("#profile-add-modal");

const formValidator1 = new FormValidator(config, formElement1);
const formValidator2 = new FormValidator(config, formElement2);

formValidator1.enableValidation();
formValidator2.enableValidation();

formValidator1.disableButton();
formValidator2.disableButton();

function openEditModal() {
  openPopup(editModal);
  formValidator1.enableValidation();
}

function openAddModal() {
  openPopup(addCardModal);
  formValidator2.enableValidation();
}

profileEditButton.addEventListener("click", openEditModal);
profileAddButton.addEventListener("click", openAddModal);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link });
  evt.target.reset();
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEscapeKey);
  popup.addEventListener("click", closeModalOnRemoteClick);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscapeKey);
  popup.removeEventListener("click", closeModalOnRemoteClick);
}

profileAddButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardClose.addEventListener("click", () => {
  closePopup(addCardModal);
});

profileEditButton.addEventListener("click", () => {
  openPopup(editModal);
  fillProfileForm();
});

editModalCloseButton.addEventListener("click", () => {
  closePopup(editModal);
});

function fillProfileForm() {
  editModalTitleInput.value = profileTitle.textContent;
  editModalSubtitleInput.value = profileSubtitle.textContent;
}

function editProfileModal() {
  profileTitle.textContent = editModalTitleInput.value;
  profileSubtitle.textContent = editModalSubtitleInput.value;
  closePopup(editModal);
}

const profileAddedForm = document.forms["add-form"];

profileAddedForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event, addCardModal);
  closePopup(addCardModal);
});

const profileForm = document.forms["modal-form"];

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editProfileModal();
});

function handleImageClick(cardElement, cardData) {
  const modalImage = cardElement.querySelector(".card__image");
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  openPreview(cardData);
}

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardList.append(cardElement);
});

function openPreview(cardData) {
  previewImage.setAttribute("src", cardData.link);

  previewImage.setAttribute("alt", `Photo of ${cardData.name}`);

  previewImageTitle.textContent = cardData.name;

  openPopup(modalPreview);
}

const modalPreview = document.querySelector("#modal-image-preview");
const previewImage = modalPreview.querySelector(".modal__image");
const previewImageTitle = modalPreview.querySelector(".modal__image-subtitle");
const closePreviewButton = modalPreview.querySelector(".modal__close_image");

closePreviewButton.addEventListener("click", () => {
  closePopup(modalPreview);
});

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
}

function closeModalOnEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
