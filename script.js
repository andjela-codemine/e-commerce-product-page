const mainImg = document.querySelector('.main-img');
const thumbs = document.querySelectorAll('.thumbnails img');
const body = document.querySelector('body');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
        mainImg.src = this.src;
    });
});

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const gallery = document.querySelector('.image-gallery');

const isBigScreen = window.matchMedia('(min-width: 768px)').matches;
if (isBigScreen) {
    mainImg.addEventListener('click', openModalForBigScreen);
}

function openModalForBigScreen() {
    body.style.overflow = 'hidden';
    const galleryCopy = gallery.cloneNode(true);

    const mainImgModal = galleryCopy.querySelector('.main-img');

    const thumbnailImages = galleryCopy.querySelectorAll('.thumbnails img');
    const totalThumbnails = thumbnailImages.length;
    let currentThumbnailIndex = 0;

    thumbnailImages.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            mainImgModal.src = this.src;
            currentThumbnailIndex = index;
        });
    });
    modal.appendChild(galleryCopy);

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    const previousImageButton = document.querySelector('.modal-previous-button');
    const nextImageButton = document.querySelector('.modal-next-button');

    previousImageButton.addEventListener('click', () => {
        currentThumbnailIndex = (currentThumbnailIndex - 1 + totalThumbnails) % totalThumbnails;
        mainImgModal.src = thumbnailImages[currentThumbnailIndex].src;
    });

    nextImageButton.addEventListener('click', () => {
        currentThumbnailIndex = (currentThumbnailIndex + 1) % totalThumbnails;
        mainImgModal.src = thumbnailImages[currentThumbnailIndex].src;
    });

    const modalCloseButton = document.querySelector('.modal-close-button');

    modalCloseButton.addEventListener('click', () => closeModal());
    modalOverlay.addEventListener('click', () => closeModal());

    function closeModal() {
        if (galleryCopy && galleryCopy.parentNode === modal) {
            modal.removeChild(galleryCopy);
        }
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        body.style.overflow = 'auto';
    }
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
