/* eslint-disable prettier/prettier */
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=9141ff75b8f69e89f1f3710e06418a0c';

// Get Popular Movies
export const getPopularMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/movie/popular?${apiKey}&language=id-ID`,
  );
  // console.log(JSON.stringify(response.data.results[0], null, 2));
  return response.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

// Get Popular TV
export const getPopularTV = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

// Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};

// Get Movie Detail
export const getMovie = async id => {
  const response = await axios.get(
    `${apiUrl}/movie/${id}?${apiKey}&language=id-ID`,
  );
  return response.data;
};
