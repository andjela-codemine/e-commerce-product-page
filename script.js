const mainImg = document.querySelector('.main-img');
const thumbs = document.querySelectorAll('.thumbnails img');
const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const gallery = document.querySelector('.image-gallery');
const previousImageButton = document.querySelector('.modal-previous-button');
const nextImageButton = document.querySelector('.modal-next-button');

const smallDevice = window.matchMedia('(min-width: 576px)');
let isEventAttached = false;

function handleDeviceChange(e) {
    if (e.matches) {
        if (!isEventAttached) {
            mainImg.addEventListener('click', openModalForBigScreen);
            isEventAttached = true;
        }
    } else {
        if (isEventAttached) {
            mainImg.removeEventListener('click', openModalForBigScreen);
            closeModal();
            isEventAttached = false;
        }
        smallScreen();
    }
}

handleDeviceChange(smallDevice);

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
        mainImg.src = this.src;
    });
});

function openModalForBigScreen() {
    body.style.overflow = 'hidden';
    const galleryCopy = gallery.cloneNode(true);
    const mainImgModal = galleryCopy.querySelector('.main-img');

    const thumbnailImagesModal = galleryCopy.querySelectorAll('.thumbnails img');
    let currentThumbnailIndex = 0;

    thumbnailImagesModal.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            mainImgModal.src = this.src;
            currentThumbnailIndex = index;
        });
    });
    modal.appendChild(galleryCopy);
    previousImageButton.style.display = 'flex';
    nextImageButton.style.display = 'flex';
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    slideShow(currentThumbnailIndex, thumbnailImagesModal, mainImgModal);

    const modalCloseButton = document.querySelector('.modal-close-button');

    modalCloseButton.addEventListener('click', () => closeModal());
    modalOverlay.addEventListener('click', () => closeModal());

}

function closeModal() {
    const galleryCopy = modal.querySelector('.image-gallery');
    if (galleryCopy) {
        modal.removeChild(galleryCopy);
    }
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    body.style.overflow = 'auto';
}


function slideShow(currentThumbnailIndex, thumbnailImages, mainImage) {
    const totalThumbnails = thumbs.length;

    previousImageButton.addEventListener('click', () => {
        currentThumbnailIndex = (currentThumbnailIndex - 1 + totalThumbnails) % totalThumbnails;
        mainImage.src = thumbnailImages[currentThumbnailIndex].src;
    });

    nextImageButton.addEventListener('click', () => {
        currentThumbnailIndex = (currentThumbnailIndex + 1) % totalThumbnails;
        mainImage.src = thumbnailImages[currentThumbnailIndex].src;
    });
}

const mobileMenu = document.querySelector('.mobile-menu-overlay');
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');

mobileMenuIcon.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    mobileMenu.style.display = 'block';

    const navElems = document.querySelector('.nav-items');

    const clonedNavElems = navElems.cloneNode(true);
    mobileMenu.appendChild(clonedNavElems);
    clonedNavElems.style.display = 'block';

    const iconClose = document.querySelector('.icon-close');
    iconClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        mobileMenu.style.display = 'none';

        clonedNavElems.remove();
    });
});

function smallScreen() {
    slideShow(0, thumbs, mainImg);
    gallery.appendChild(previousImageButton);
    gallery.appendChild(nextImageButton);
}

const decreaseButton = document.querySelector('.decrease');
const increaseButton = document.querySelector('.increase');
const quantityValueElement = document.querySelector('.quantity-value');
const addToCartButton = document.querySelector('.add-to-cart-button');
const basketCounterElement = document.querySelector('.basket-counter');

const cartShow = document.querySelector('.cart-product');
const productCounterElement = document.querySelector('.product-count');
const productPriceString = document.querySelector('.cart-product-price');
const productDeleteButtonElement = document.querySelector('.cart-product-delete');
const productTotalPriceElement = document.querySelector('.cart-product-total');
const cartCheckoutButton = document.querySelector('.cart-checkout-button');
const cartEmptyElement = document.querySelector('.cart-empty');
const cartElement = document.querySelector('.cart');

const basketWrapper = document.querySelector('.basket-wrapper svg');

let isCartVisible = false;
basketWrapper.addEventListener('click', () => {
    isCartVisible = !isCartVisible;
    cartElement.style.display = isCartVisible ? 'flex' : 'none';
});

let basketCounter = 0;
const updateBasketCounter = (i) => {
    basketCounter += i;
    if (basketCounter > 0) {
        basketCounterElement.textContent = basketCounter.toString();
        basketCounterElement.style.opacity = '1';
    }
};

let i = parseInt(quantityValueElement.textContent);
decreaseButton.addEventListener('click', () => {
    i = Math.max(0, i - 1);
    quantityValueElement.textContent = i.toString();
});
increaseButton.addEventListener('click', () => {
    i += 1;
    quantityValueElement.textContent = i.toString();
});
addToCartButton.addEventListener('click', () => {
    if (i <= 0) {
        return;
    }
    cartShow.style.display = 'flex';
    cartCheckoutButton.style.display = 'block';
    cartEmptyElement.style.display = 'none';
    quantityValueElement.textContent = '0';

    updateBasketCounter(i);
    i = 0;

    let productPriceFloat = parseFloat(productPriceString.textContent.replace('$', ''));
    productCounterElement.textContent = basketCounter.toString();
    productTotalPriceElement.textContent = `${ (basketCounter * productPriceFloat).toFixed(2) }$`;

});

productDeleteButtonElement.addEventListener('click', () => {
    basketCounter = 0;
    i = 0;
    basketCounterElement.style.opacity = '0';
    cartShow.style.display = 'none';
    cartCheckoutButton.style.display = 'none';
    cartEmptyElement.style.display = 'flex';
});


