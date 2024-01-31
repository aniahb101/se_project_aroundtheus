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

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#title-textbox");
const profileSubtitleInput = document.querySelector("#subtitle-textbox");
const modalClose = document.querySelector(".modal__close");
const saveButton = document.querySelector(".modal__button");
const profileAdd = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddClose = document.querySelector("#add-modal-close");
const profileAddSave = document.querySelector("#add-create-button");
const addCreateButton = document.querySelector("#add-create-button");

const cardTitleInput = document.querySelector(".modal__title-input");
const cardUrlInput = document.querySelector(".modal__url-input");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCards({ name, link });
  evt.target.reset();
}

function renderCards(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

profileAdd.addEventListener("click", () => {
  openPopup(profileAddModal);
});

profileAddClose.addEventListener("click", () => {
  closePopup(profileAddModal);
});

editButton.addEventListener("click", () => {
  fillProfileForm();
  editModal.classList.add("modal_opened");
});

modalClose.addEventListener("click", () => {
  editModal.classList.remove("modal_opened");
});

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function editProfileModal() {
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  editModal.classList.remove("modal_opened");
}

const profileAddedForm = document.forms["add-form"];

profileAddedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleCardFormSubmit(event, profileAddModal);
  closePopup(profileAddModal);
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

function openModalPreview() {
  modalPreview.classList.add("modal_opened");
}

closePreviewButton.addEventListener("click", () => {
  closeModalPreview();
});

function closeModalPreview() {
  modalPreview.classList.remove("modal_opened");
}

const openPreview = (cardData) => {
  previewImage.setAttribute("src", cardData.link);
  previewImage.setAttribute("alt", `Photo of ${cardData.name}`);
  previewImageTitle.textContent = cardData.name;

  openModalPreview(modalPreview);
};

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
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

  cardElement.addEventListener("click", (event) => {
    const likeButton = event.target.closest(".card__like-button");

    if (deleteButton.contains(event.target)) {
    } else if (likeButton) {
      likeButton.classList.toggle("liked");
    } else {
      openPreview(cardData);
    }
  });

  return cardElement;
}

function renderCards(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}
