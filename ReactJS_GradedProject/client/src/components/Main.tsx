import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IMovieList from "../model/IMovieList";
import { fetchMovie } from "../services/FetchData";
import MovieCard from "./MovieCard";
import "../styles/Main.css";

type Props = {
  searchValue: string;
};

export default function Main({ searchValue }: Props) {
  const [moviesData, setMoviesData] = useState<IMovieList[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovieList[]>([]);
  const location = useLocation();

  let tabName: string = location.state?.tab || "movies-in-theaters";

  const fetchMovies = async () => {
    try {
      const movies = await fetchMovie(tabName);
      setMoviesData(movies);
    } catch (error) {
      console.error(error as Error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [tabName]);

  useEffect(() => {
    const filteredData = searchValue
      ? moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue)
        )
      : moviesData;
    setFilteredMovies(filteredData);
  }, [moviesData, searchValue]);

  return (
    <>
      {filteredMovies.map((movie) => (
        <MovieCard movie={movie} tabName={tabName} fetchMovies={fetchMovies} />
      ))}
    </>
  );
}
