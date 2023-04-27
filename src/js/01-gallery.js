// Add imports above this line

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

function createLiElem(image) {
  const {
    preview: smallImg,
    original: bigImg,
    description: descriptionImg,
  } = image;
  return `<li class="gallery__item"> 
      <a class='gallery__link' href="${bigImg}">
        <img class="gallery__image" src="${smallImg}" alt="${descriptionImg}" />
      </a> 
    </li>
     `;
}

const galleryArray = [];
const ulElement = document.querySelector('.gallery');
const options = {
  captionsData: 'alt',
  captionDelay: 250,
};

for (let i = 0; i < galleryItems.length; i++) {
  galleryArray.push(createLiElem(galleryItems[i]));
}
const insertedString = galleryArray.join('');
ulElement.insertAdjacentHTML('afterbegin', insertedString);

let gallery = new SimpleLightbox('.gallery a', options);
