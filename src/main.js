// src/main.js
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  setLoadMoreHandler,
  showLoadMore,
  disableLoadMore,
  enableLoadMore,
} from './js/render-gallery.js';

let query = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    query = form.searchQuery.value.trim();
    if (!query) return;

    page = 1;
    clearGallery();
    disableLoadMore(); // Başlangıçta pasif yap
    showLoader();

    try {
      const response = await fetchImages(query, page);
      totalHits = response.totalHits;

      if (response.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      renderGallery(response.hits);

      if (page * perPage < totalHits) {
        enableLoadMore(); // veri varsa aktif yap
        showLoadMore(); // ve görünür hale getir
      } else {
        disableLoadMore(); // başka sayfa yoksa pasif
      }
    } catch (error) {
      iziToast.error({
        message: 'Error fetching images. Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

  // Load More handler
  setLoadMoreHandler(async () => {
    page += 1;
    disableLoadMore(); // tekrar tıklamayı önle
    showLoader();

    try {
      const response = await fetchImages(query, page);
      renderGallery(response.hits);

      if (page * perPage >= totalHits) {
        disableLoadMore(); // son sayfa, pasif yap
      } else {
        enableLoadMore(); // devam varsa aktif bırak
      }
    } catch (error) {
      iziToast.error({
        message: 'Error loading more images.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });
});
