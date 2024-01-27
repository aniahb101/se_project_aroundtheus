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

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCards({ name, link });
}

function renderCards(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
}

profileAdd.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});

profileAddClose.addEventListener("click", () => {
  profileAddModal.classList.remove("modal_opened");
});

editButton.addEventListener("click", () => {
  fillProfileForm();
  editModal.classList.add("modal_opened");
});

saveButton.addEventListener("click", () => {
  openEditProfileModal();
  editModal.classList.remove("modal_opened");
});

addCreateButton.addEventListener("click", () => {
  profileAddModal.classList.remove("modal_opened");
});

modalClose.addEventListener("click", () => {
  editModal.classList.remove("modal_opened");
});

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function openEditProfileModal() {
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  editModal.classList.remove("modal_opened");
}

const profileAddedForm = profileAddModal.querySelector("#add-form");

profileAddedForm.addEventListener("submit", addCardFormSubmit);

const profileForm = editModal.querySelector(".modal__form");

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  openEditProfileModal();
});

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

cardList.addEventListener("click", (event) => {
  const likeButton = event.target.closest(".card__like-button");

  if (likeButton) {
    likeButton.classList.toggle("liked");
  }
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});

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

    return cardElement;
  }
}
