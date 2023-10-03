import Notiflix from 'notiflix';
import { fetchImages } from './img-api';

const formEl = document.querySelector('.search-form');
const divEl = document.querySelector('.gallery');
// const inputEl = document.querySelector('[name=searchQuery]');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onSubmitBtn);
loadMoreBtn.addEventListener('click', onLoadMoreData);

let page = 1;
let totalAmountOfImages = 500;
let amountPerPage = 40;
let searchQuery = '';

const renderPage = async () => {
  const lastPage = Math.ceil(totalAmountOfImages / amountPerPage);

  try {
    const images = await fetchImages(searchQuery, page);
    if (images.length === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    createMarkup(images);
    loadMoreBtn.classList.remove('is-hidden');

    if (page === lastPage) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, someting went wrong!');
  }
};

function createMarkup(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
    <img src="${image.webformatURL}" alt="Tags: ${image.tags}" loading="lazy" width=250 height=200 />
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

function onSubmitBtn(event) {
  event.preventDefault();

  page = 1;
  searchQuery = event.target.elements.searchQuery.value.trim();
  divEl.innerHTML = '';

  renderPage();
}

function onLoadMoreData() {
  page += 1;

  renderPage();
}
