const API_KEY = `19234341-bbc7811a42f823cfa8eb8945b`;
const API_URL = `https://pixabay.com/api/`;

const request = (param = '') => fetch(`${API_URL}?key=${API_KEY}${param}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const getImages = (query, perPage) => {
  const preparedQuery = query.replace(/\s+/g, '+').trim()

  return request(`&q=${preparedQuery}&per_page=${perPage}`)
};
