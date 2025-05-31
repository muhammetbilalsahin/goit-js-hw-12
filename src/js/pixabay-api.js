import axios from 'axios';

export async function fetchImages(query) {
  const API_KEY = '50349576-73448956e16d67ea550d7c551';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  const { data } = await axios.get(URL);
  return data;
}
