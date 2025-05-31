import axios from 'axios';

const API_KEY = '50349576-73448956e16d67ea550d7c551';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });
  return response.data;
}
