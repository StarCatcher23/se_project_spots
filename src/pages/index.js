import "./index.css";
import {
  enableValidation,
  resetValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "26822020-7537-483b-afd6-df8a444cb04a",
    "Content-Type": "application/json",
  },
});

fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    authorization: "26822020-7537-483b-afd6-df8a444cb04a",
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((userInfo) => {
    document.querySelector(".profile__name").textContent = userInfo.name;
    document.querySelector(".profile__description").textContent =
      userInfo.about;
    document.querySelector(".profile__image").src = userInfo.avatar;
  })
  .catch((err) => console.error(err));

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "POST",
  headers: {
    authorization: "26822020-7537-483b-afd6-df8a444cb04a",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "My New Card",
    link: "https://media.istockphoto.com/id/2119790745/photo/a-mother-and-her-daughter-looking-at-the-sunset-view-of-the-eiffel-tower.jpg?s=612x612&w=0&k=20&c=dSZnGOODUJa7s-yARPue-Fo5RMmpX3ojPolC4Kg-YiA=",
  }),
})
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => console.log("Card added:", data))
  .catch((err) => console.error(err));

function deleteCard(cardId) {
  fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add other necessary headers like Authorization if needed
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete the card");
      }
      console.log("Card deleted successfully");
      // You can add additional logic here, like removing the card from the DOM
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//destrcutured the 2nd item in the call back in the .then()
api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    // TODO-Render cards (2nd item in the array)
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    //Handled user info (1st item in the array)
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;

    //  Sets the user’s avatar URL and the  attribute to their name.
    const profileAvatarEl = document.querySelector(".profile__image");
    if (profileAvatarEl) {
      profileAvatarEl.src = userInfo.avatar;
      profileAvatarEl.alt = userInfo.name;
    }
  })
  .catch(console.error);

//profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//card form elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

//Avatar Form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//Delete form elements
const deleteModal = document.getElementById("delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

//Preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

//Card Related Elements
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  // Set card content
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Like button toggle
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  // Delete button opens delete modal
  cardDeleteBtnEl.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id; // Make sure your API returns _id
    openModal(deleteModal);
  });

  // Preview image modal
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

//This function closes modal if the escape key is pressed
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened"); // Find the opened modal
    if (openedModal) {
      closeModal(openedModal); // Replace with your modal close function
    }
  }
}

// This function opens a modal
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  // Add the Escape key listener when modal opens
  // Listen for a keypress, then call the handle Escape function
  document.addEventListener("keydown", handleEscape);
}

//This function closes a modal
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  // Removes the listener Escape
  document.removeEventListener("keydown", handleEscape);
}

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(newPostForm, settings); // make sure button resets
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// ─── Avatar Modal Listeners ─────────────────────────────

// Open avatar modal on button click
avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings); // keep consistent with other modals
  openModal(avatarModal);
});

// Close avatar modal on close button click
avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

// Handle avatar form submission
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  api
    .editAvatar(avatarInput.value) // assuming your Api class has editAvatar
    .then((data) => {
      // update avatar in profile
      const profileAvatarEl = document.querySelector(".profile__image");
      profileAvatarEl.src = data.avatar;
      profileAvatarEl.alt = data.name;

      closeModal(avatarModal);
    })
    .catch(console.error);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      // ✅ Use the data returned from the server
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;

      // If your API also returns the avatar, you can update it here too:
      const profileAvatarEl = document.querySelector(".profile__image");
      if (profileAvatarEl && data.avatar) {
        profileAvatarEl.src = data.avatar;
        profileAvatarEl.alt = data.name;
      }

      closeModal(editProfileModal);
    })
    .catch(console.error);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const imageLink = newPostImageInput.value;
  const captionInput = newPostCaptionInput.value;

  const newCardData = {
    name: captionInput,
    link: imageLink,
  };

  const newCardElement = getCardElement(newCardData);
  cardsList.prepend(newCardElement); // Adds the new card to the top of the list

  newPostForm.reset(); // Clears the form inputs
  disableButton(cardSubmitBtn, settings);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("modal") &&
    evt.target.classList.contains("modal_is-opened")
  ) {
    closeModal(evt.target); // closes the modal that was clicked
  }
});

// TODO: finish avatar submission handler
function handleAvatarSubmit(evt) {
  evt.preventDefault(); // prevent default form submission

  console.log(avatarInput.value);

  api
    .editAvatar(avatarInput.value) // use the correct method name
    .then((data) => {
      console.log(data);

      // update avatar in profile
      const profileAvatarEl = document.querySelector(".profile__image");
      profileAvatarEl.src = data.avatar;
      profileAvatarEl.alt = data.name;

      closeModal(avatarModal); // close modal after success
    })
    .catch(console.error);
}

// attach listener
avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

let cardToDelete = null; // Store reference to the card being deleted
let selectedCard = null;
let selectedCardId = null;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  console.log(cardId);
  openModal(deleteModal); // show modal
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  api
    .deleteCard(selectedCardId)
    .then(() => {
      // ✅ remove the card from the DOM
      if (selectedCard) {
        selectedCard.remove();
        selectedCard = null;
        selectedCardId = null;
      }

      // ✅ close the modal
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error("Delete failed:", err);
    });
}

const cancelBtn = deleteForm.querySelector(".modal__cancel-btn");

if (cancelBtn) {
  cancelBtn.addEventListener("click", function () {
    // ✅ use the same variables consistently
    selectedCard = null;
    selectedCardId = null;
    closeModal(deleteModal);
  });
} else {
  console.warn("Cancel button not found for delete form.");
}

// ✅ always outside the if/else
enableValidation(settings);
