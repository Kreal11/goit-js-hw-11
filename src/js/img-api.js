import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39794314-b7170df023ca4db44fdda06f6';

export const fetchImages = async term => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: term,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data.hits;
};