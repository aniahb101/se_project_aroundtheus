import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
const profileAddButton = document.querySelector(".profile__add-button");
const editModalTitleInput = document.querySelector("#title-textbox");
const editModalSubtitleInput = document.querySelector("#subtitle-textbox");
const editModalCloseButton = document.querySelector(".modal__close");
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

function handleCardFormSubmit(evt) {
  console.log(evt);
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link });
  evt.target.reset();
  cardFormValidator.disableButton();
}

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
const editModalPopup = new PopupWithForm(".modal", editProfileModal);
addCardPopup.setEventListeners();
editModalPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

addCardClose.addEventListener("click", () => {
  addCardPopup.close();
});

profileEditButton.addEventListener("click", () => {
  editModalTitleInput.value = userInfo.getUserInfo().name;
  editModalSubtitleInput.value = userInfo.getUserInfo().job;
  editModalPopup.open();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

editModalCloseButton.addEventListener("click", () => {
  editModalPopup.close();
});

function editProfileModal() {
  const newName = editModalTitleInput.value;
  const newJob = editModalSubtitleInput.value;
  userInfo.setUserInfo({ name: newName, job: newJob });
}

const profileAddedForm = document.forms["add-form"];

profileAddedForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event);
  addCardPopup.close();
});

const profileForm = document.forms["modal-form"];

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editProfileModal();
  editModalPopup.close();
});

const cardFormValidator = new FormValidator(config, profileAddedForm);
const profileFormValidator = new FormValidator(config, profileForm);

cardFormValidator.disableButton();
profileFormValidator.disableButton();

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

const modalPreview = document.querySelector("#modal-image-preview");
const closePreviewButton = modalPreview.querySelector(".modal__close_image");

closePreviewButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

const imagePopup = new PopupWithImage("#modal-image-preview");

imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

cardSection.renderItems();

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}
