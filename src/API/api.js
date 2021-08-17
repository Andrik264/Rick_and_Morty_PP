const BASE_URL = 'https://rickandmortyapi.com/api';

export const request = async(endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  const json = await response.json();

  return json;
};
