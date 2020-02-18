const btnHeader = document.querySelector("header button");
const form = document.querySelector(".form");

btnHeader.addEventListener("click", () => {
  form.classList.toggle("hide");
});
