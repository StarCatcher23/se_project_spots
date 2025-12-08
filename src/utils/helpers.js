export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    // set loading text
    btn.textContent = loadingText;
  } else {
    // set the not loading text
    btn.textContent = defaultText;
  }
}
