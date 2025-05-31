import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ul = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.loading-button');

let lightbox = new SimpleLightbox('.image-li a', {
  captionDelay: 250,
  captionsData: 'alt',
});

let loadMoreCallback = null;

export function renderGallery(images) {
  const appendHtml = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-li">
           <a href="${largeImageURL}"> 
             <img class="li-img" src="${webformatURL}" alt="${tags
          .split(',')
          .slice(0, 3)
          .join(',')}" /> 
           </a>
          <div class="div-upper">
            <ul>
              <li><div class="div-inner"><b>Likes</b> ${likes}</div></li>
              
              <li><div class="div-inner"><b>Views</b> ${views}</div></li>
              <li><div class="div-inner"><b>Comments</b> ${comments}</div></li>
              <li><div class="div-inner"><b>Downloads</b> ${downloads}</div></li>
            </ul>
          </div>
        </li>`;
      }
    )
    .join('');

  ul.insertAdjacentHTML('beforeend', appendHtml);
  lightbox.refresh();
}

export function clearGallery() {
  ul.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.hidden').style.display = 'flex';
}

export function hideLoader() {
  document.querySelector('.hidden').style.display = 'none';
}

loadMoreButton.addEventListener('click', () => {
  if (typeof loadMoreCallback === 'function') {
    disableLoadMore(); // butonu geçici devre dışı bırak
    loadMoreCallback();
  }
});

export function setLoadMoreHandler(callback) {
  loadMoreCallback = callback;
}

export function showLoadMore() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMore() {
  loadMoreButton.style.display = 'none';
}

export function disableLoadMore() {
  loadMoreButton.disabled = true;
}

export function enableLoadMore() {
  loadMoreButton.disabled = false;
}
