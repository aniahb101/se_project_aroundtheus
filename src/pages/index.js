// Imported modules and components
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  editModalTitleInput,
  editModalSubtitleInput,
  addCardTitleInput,
  addCardUrlInput,
  avatarIcon,
} from "../Utils/Constants.js";

function handleDeleteConfirmation() {
  deleteModalPopup.open();
}

function handleDeleteButton(card) {
  console.log("Deleting card with ID:", card);

  api
    .deleteCard(card._id)
    .then((result) => {
      cardSection.handleDeleteCard(result);
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

//Function to handle card form submission
function handleCardFormSubmit() {
  api
    .addCard({ name: addCardTitleInput.value, link: addCardUrlInput.value })
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
    .updateProfile(data)
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
  console.log(item);
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteConfirmation,
    handleAvatarClick,
    handleDeleteButton
    //handleLikeButton
  );

  return cardElement.getView();
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

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((error) => {
    // Handle error fetching initial cards
    console.error("Error fetching initial cards:", error);
  });
