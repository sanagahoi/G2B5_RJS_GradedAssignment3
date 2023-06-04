import axios from "axios";
import IMovieList from "../model/IMovieList";

const HostAPI: string = "http://localhost:4002";

export const fetchMovie = async (tab: string, movieId?: string) => {
  if (movieId) {
    const API = `${HostAPI}/${tab}?id=${movieId}`;
    return axios.get(API).then((response) => response.data);
  }
  const API = `${HostAPI}/${tab}`;
  return axios.get(API).then((response) => response.data);
};

export const fetchFavouriteMovies = async () => {
  return axios.get(`${HostAPI}/favourite`).then((response) => response.data);
};

export const addMovieToFavourites = async (movie: IMovieList) => {
  return axios
    .post(`${HostAPI}/favourite`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.status);
};

export const removeMovieFromFavourites = async (movieId: number) => {
  const API = `${HostAPI}/favourite/${movieId}`;
  return axios.delete(API).then((response) => response.status);
};
