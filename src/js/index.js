import Notiflix from 'notiflix';
import { fetchImages } from './img-api';

const formEl = document.querySelector('.search-form');
const divEl = document.querySelector('.gallery');
const inputEl = document.querySelector('[name=searchQuery]');

const onSubmitBtn = async event => {
  event.preventDefault();

  const term = inputEl.value;

  try {
    const images = await fetchImages(term);
    renderPage(images);
  } catch (error) {
    Notiflix.Notify.failure('Oops, someting went wrong!');
  }
};

formEl.addEventListener('submit', onSubmitBtn);

function renderPage(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
  <img src="${image.webformatURL}" alt="Tags: ${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${image.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  divEl.insertAdjacentHTML('beforeend', markup);
}
