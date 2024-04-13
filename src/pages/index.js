// Imported modules and components
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";

// Initial card data
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

// Selecting DOM elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editModalTitleInput = document.querySelector("#title-textbox");
const editModalSubtitleInput = document.querySelector("#subtitle-textbox");
const addCardTitleInput = document.querySelector("#card-title-textbox");
const addCardUrlInput = document.querySelector("#card-subtitle-textbox");

function handleDeleteConfirmation() {
  deleteModalPopup.open();
}

function handleDeleteButton(id) {
  console.log("Deleting card with ID:");

  api
    .deleteCard(id)
    .then(() => {
      deleteModalPopup.close();
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
}

// Creating an instance of PopupWithForm for delete modal
const deleteModalPopup = new PopupWithForm(
  "#delete-modal-popup",
  handleDeleteButton
);

deleteModalPopup.setEventListeners();

const avatarIcon = document.querySelector(".profile__add-image");

// Event listener for avatar icon click to open avatar modal
avatarIcon.addEventListener("click", handleAvatarClick);

const avatarModalPopup = new PopupWithForm(
  "#modal-avatar-popup",
  handleAvatarFormSubmit
);

function handleAvatarClick() {
  avatarModalPopup.open();
}

avatarModalPopup.setEventListeners();

function handleAvatarFormSubmit(data) {
  api
    .updateAvatar(data)
    .then((res) => {
      console.log("Avatar updated successfully");
      userInfo.setAvatar(res.avatar);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });

  avatarModalPopup.close();
}

// Configuration for form validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__invalid",
  errorClass: "modal__invalid_active",
  inputInvalidClass: "modal__text_invalid",
};

//Function to handle card form submission
function handleCardFormSubmit() {
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;

  // Call addCard API method to add a new card
  api
    .addCard({ name, link })
    .then((cardData) => {
      // Render the new card
      renderCard(cardData);
      // Close the popup
      addCardPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    });
}

// Creating instances of popup forms
const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
const editModalPopup = new PopupWithForm(
  "#profile-edit-modal",
  editProfileModal
);

addCardPopup.setEventListeners();
editModalPopup.setEventListeners();

// Event listeners for buttons
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  editModalTitleInput.value = name;
  editModalSubtitleInput.value = job;
  editModalPopup.open();
});

// Creating UserInfo instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__image",
});

// Function to handle edit profile form submission

function editProfileModal() {
  const newName = editModalTitleInput.value;
  const newJob = editModalSubtitleInput.value;
  api
    .updateProfile(newName, newJob)
    .then((response) => {
      console.log("Profile updated successfully:", response);
      userInfo.setUserInfo({ name: newName, job: newJob });
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
  editModalPopup.close();
}

// Selecting profile form elements
const profileAddedForm = document.forms["add-form"];
const profileForm = document.forms["modal-form"];

// Creating form validators
const cardFormValidator = new FormValidator(config, profileAddedForm);
const profileFormValidator = new FormValidator(config, profileForm);

// Disabling form buttons
cardFormValidator.disableButton();
profileFormValidator.disableButton();

// Enabling form validation
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Function to handle image click
function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

// Function to create card HTML
function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteConfirmation,
    handleAvatarClick,
    handleDeleteButton
  );
  console.log(item);
  return cardElement.generateCard();
}

// Creating instance of PopupWithImage
const imagePopup = new PopupWithImage("#modal-image-preview");
imagePopup.setEventListeners();

// Creating card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

// Rendering initial cards
cardSection.renderItems();

// Function to render a single card
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d9d73c7f-57bf-4e5e-8837-ef7b15edaabc",
    "Content-Type": "application/json",
  },
});
