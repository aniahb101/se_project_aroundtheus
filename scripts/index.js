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

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCards({ name, link });
  evt.target.reset();
}

function renderCards(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.body.addEventListener("keydown", closeModalOnEscapeKey);
  popup.addEventListener("click", closeModalOutside);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.body.removeEventListener("keydown", closeModalOnEscapeKey);
  popup.removeEventListener("click", closeModalOutside);
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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});

const modalPreview = document.querySelector("#modal-image-preview");
const previewImage = modalPreview.querySelector(".modal__image");
const previewImageTitle = modalPreview.querySelector(".modal__image-subtitle");
const closePreviewButton = modalPreview.querySelector(".modal__close_image");

closePreviewButton.addEventListener("click", () => {
  closePopup(modalPreview);
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Photo of ${cardData.name}`;

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  if (likeButton) {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("liked");
    });
  }

  function openPreview(cardData) {
    previewImage.setAttribute("src", cardData.link);
    previewImage.setAttribute("alt", `Photo of ${cardData.name}`);
    previewImageTitle.textContent = cardData.name;
    openPopup(modalPreview);
  }

  if (cardImage) {
    cardImage.addEventListener("click", (event) => {
      openPreview(cardData);
    });
  }
  return cardElement;
}

function renderCards(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

function closeModalOnEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}
function closeModalOutside(event) {
  const openModals = document.querySelectorAll(".modal_opened");
  openModals.forEach((openModal) => {
    if (!event.target.closest(".modal__container")) {
      closePopup(openModal);
    }
  });
}
