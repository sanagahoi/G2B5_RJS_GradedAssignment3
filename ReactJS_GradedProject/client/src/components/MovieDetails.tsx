import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IMovieList from "../model/IMovieList";
import { fetchMovie } from "../services/FetchData";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const location = useLocation();
  const tabName = location.state?.tab;
  const movieId = location.state?.id;

  const [movieData, setMovieData] = useState<IMovieList[]>([]);

  const fetchMovieDetails = async () => {
    try {
      const movie = await fetchMovie(tabName, movieId);
      const formattedMovie = formatDurationAndRatings(movie);
      setMovieData(formattedMovie);
    } catch (error) {
      console.error(error as Error);
    }
  };

  const formatDurationAndRatings = (movies: IMovieList[]) => {
    return movies.map((movie) => {
      const timeInMin = parseInt(
        movie.duration.substring(2, movie.duration.length - 1)
      );
      const hours = Math.floor(timeInMin / 60);
      const minutes = timeInMin % 60;
      const formattedTime = `${hours}h ${minutes}m`;

      const sum = movie.ratings.reduce((total, rating) => total + rating, 0);
      const avgRating = sum / movie.ratings.length;
      const roundedAvgRating = Math.round(avgRating);

      return {
        ...movie,
        duration: formattedTime,
        averageRating: roundedAvgRating,
      };
    });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <>
      {movieData.map((movie) => {
        return (
          <Fragment>
            <div className="movie-details-container" key={movie.id}>
              <div className="movie-details-image">
                <img src={movie.posterurl} alt={movie.title} />
              </div>
              <div className="movie-details-details">
                <h2>{`${movie.title} (${movie.releaseDate?.slice(0, 4)})`}</h2>
                <div className="movie-details-rating">
                  <div className="movie-details-label">IMDb Rating:</div>
                  <div className="movie-details-value">{movie.imdbRating}</div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Content Rating:</div>
                  <div className="movie-details-value">
                    <strong>{movie.contentRating}</strong>
                  </div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Average Rating:</div>
                  <div className="movie-details-value">
                    {movie.averageRating}
                  </div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Duration:</div>
                  <div className="movie-details-value">{movie.duration}</div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Genres:</div>
                  <div className="movie-details-value">
                    {movie.genres?.join()}
                  </div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Actors:</div>
                  <div className="movie-details-value">
                    {movie.actors?.join()}
                  </div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Release Date:</div>
                  <div className="movie-details-value">{movie.releaseDate}</div>
                </div>
                <div className="movie-details-rating">
                  <div className="movie-details-label">Storyline:</div>
                  <div className="movie-details-value">{movie.storyline}</div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
export default MovieDetails;
