const URL = 'https://pixabay.com/api/';
const KEY = '35988928-ef839336b426408be122bb6a8';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

async function fetchImages(query, page = 1) {
  const response = await fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`
  );
  return await response.json();
}

export default fetchImages;
