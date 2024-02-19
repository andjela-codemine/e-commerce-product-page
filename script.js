const mainImg = document.querySelector('.main-img');
const thumbs = document.querySelectorAll('.thumbnails img');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
        mainImg.src = this.src;
    });
});

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const gallery = document.querySelector('.image-gallery');

mainImg.addEventListener('click', () => {
    const galleryCopy = gallery.cloneNode(true);

    const mainImgModal = galleryCopy.querySelector('.main-image');

    const thumbnailImages = galleryCopy.querySelectorAll('.thumbnails img');

    thumbnailImages.forEach((thumbnail) => {
        thumbnail.addEventListener('click', function () {
            mainImgModal.src = this.src;
        });
    });
    modal.appendChild(galleryCopy);

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
});

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
