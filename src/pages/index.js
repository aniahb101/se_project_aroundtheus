// Imported modules and components
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js";
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

// Instantiate API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d9d73c7f-57bf-4e5e-8837-ef7b15edaabc",
    "Content-Type": "application/json",
  },
});

// Function to handle like button click
function handleLikeButtonClick(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch(console.error);
  }
}

// Function to handle delete button click
function handleDeleteButtonClick(card) {
  deleteModalPopup.setConfirm(() => {
    deleteModalPopup.renderLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        card.handleDeleteButton(res);
        deleteModalPopup.close();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      })
      .finally(() => {
        deleteModalPopup.renderLoading(false);
      });
  });
  deleteModalPopup.open();
}

// Creating an instance of PopupWithForm for delete modal
const deleteModalPopup = new PopupDeleteConfirm(
  "#delete-modal-popup",
  handleDeleteButtonClick
);

deleteModalPopup.setEventListeners();

// Function to handle avatar form submission
function handleAvatarFormSubmit(data) {
  avatarModalPopup.renderLoading(true);

  api
    .updateAvatar(data)
    .then((res) => {
      console.log("Avatar updated successfully");
      userInfo.setAvatar(res.avatar);
      avatarModalPopup.close();
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      avatarModalPopup.renderLoading(false);
    });
}

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

// Function to handle card form submission
function handleCardFormSubmit() {
  addCardPopup.renderLoading(true);

  api
    .addCard({ name: addCardTitleInput.value, link: addCardUrlInput.value })
    .then((cardData) => {
      console.log("Card added successfully:");
      renderCard(cardData);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
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

  editModalPopup.renderLoading(true);

  api
    .updateProfile(newName, newJob)
    .then(() => {
      console.log("Profile updated successfully:");
      userInfo.setUserInfo({ name: newName, job: newJob });
      editModalPopup.close();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    })
    .finally(() => {
      editModalPopup.renderLoading(false);
    });
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
    handleDeleteButtonClick,
    handleLikeButtonClick,
    handleAvatarClick
  );

  return cardElement.getView();
}

// Creating instance of PopupWithImage
const imagePopup = new PopupWithImage("#modal-image-preview");
imagePopup.setEventListeners();

let cardSection;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userInfoData]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();

    userInfo.setUserInfo({
      name: userInfoData.name,
      job: userInfoData.job,
    });
    userInfo.setAvatar(userInfoData.avatar);
  })
  .catch((error) => {
    console.error("Error fetching initial data:", error);
  });

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}
