const mainImg = document.querySelector(".main-img");

const thumb1 = document.querySelector("#thumb1");
const thumb2 = document.querySelector("#thumb2");
const thumb3 = document.querySelector("#thumb3");
const thumb4 = document.querySelector("#thumb4");

thumb1.addEventListener("click", () => {
    mainImg.src = "./images/image-product-1.jpg";
});

thumb2.addEventListener("click", () => {
    mainImg.src = "./images/image-product-2.jpg";
});

thumb3.addEventListener("click", () => {
    mainImg.src = "./images/image-product-3.jpg";
});

thumb4.addEventListener("click", () => {
    mainImg.src = "./images/image-product-4.jpg";
});


const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const gallery = document.querySelector(".gallery");

mainImg.addEventListener("click", () => {
  const galleryCopy = gallery.cloneNode(true);
  
  modal.appendChild(galleryCopy);

  modal.style.display = "block";
  modalOverlay.style.display = "block";
});

