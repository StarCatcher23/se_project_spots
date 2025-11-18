//This object is like a settings file for your validator. Instead of hardcoding CSS selectors and class names inside your functions, you put them here. That way:
//Your code is reusable.
//If your CSS changes (e.g., you rename .modal__form to .popup__form), you only need to update it in one place.
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//This function finds the error message element for a specific input, inserts the error text into it, and adds CSS classes to both the input and the error message so they look styled as “invalid”
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
  errorMsgEl.classList.add(config.errorClass); // 👈 ADD THIS LINE
};

//This function hides the error for a given input by:
//Clearing the error text.
//Removing the “error styling” from both the input and its error message element.
//So showInputError makes the input and its message look invalid, while hideInputError resets it back to normal.
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
  errorMsgEl.classList.remove(config.errorClass);
};

//This function checks whether a given input is valid according to HTML5 rules.
//If invalid → it shows an error message and applies error styling.
//If valid → it hides the error message and removes the styling.
//So this is the “decision-maker” that switches between showing and hiding errors.
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(
      formEl,
      inputEl,
      inputEl.validationMessage,
      config // ✅ pass the full config object
    );
  } else {
    hideInputError(formEl, inputEl, config); // ✅ pass the full config object
  }
};

//This function answers the question:
//“Does this list of inputs contain at least one invalid field?”
//If yes → returns true.
//If all inputs are valid → returns false.
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//This function toggles the submit button’s availability.
//If any input is invalid → the button is disabled + styled as inactive.
//If all inputs are valid → the button is enabled + styled as active.
const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

export function disableButton(buttonEl, config) {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
}

export const resetValidation = (formEl, config) => {
  // Get fresh references to form elements
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  // Clear all error states
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });

  // Recalculate if button should be enabled/disabled
  toggleButtonState(inputList, buttonElement, config);
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};
