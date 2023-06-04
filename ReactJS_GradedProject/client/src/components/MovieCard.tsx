import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addMovieToFavourites,
  removeMovieFromFavourites,
  fetchFavouriteMovies,
} from "../services/FetchData";
import "../styles/MovieCard.css";
import { ImHeart, ImCross } from "react-icons/im";
import IMovieList from "../model/IMovieList";

type MovieCardProps = {
  movie: IMovieList;
  tabName: string | undefined;
  fetchMovies(): void;
};

const MovieCard = ({ movie, tabName, fetchMovies }: MovieCardProps) => {
  const navigate = useNavigate();

  const addToFav = async () => {
    let favorites = await fetchFavouriteMovies();
    let movieAlreadyexists = favorites.some(
      (favoriteMovie: IMovieList) => favoriteMovie.title === movie.title
    );
    if (movieAlreadyexists) {
      toast.error(`Error! ${movie.title} is already added to favourites!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const response = await addMovieToFavourites(movie);
    if (response === 201) {
      toast.success(`${movie.title} added to favourites successfully!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      console.log(response);
    }
  };

  const removeFromFav = async () => {
    const response = await removeMovieFromFavourites(movie.id);

    if (response === 200) {
      toast.success(`${movie.title} removed from favourites!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      /*Function prop received from parent component
			helps to re-render the page.*/
      fetchMovies();
    }
  };

  const imageClick = () => {
    let url = `/${movie.title}`;
    navigate(url, { state: { tab: tabName, id: movie.id } });
  };

  return (
    <div className="movie-card" key={movie.id}>
      <img
        src={movie.posterurl}
        alt={movie.title}
        className="movie-card__image"
        onClick={imageClick}
      />
      <div className="movie-card__details">
        <h2 className="movie-card__title">{movie.title}</h2>
        {tabName == "favourite" ? (
          <>
            <button className="movie-card__favourite" onClick={removeFromFav}>
              Remove from Favourites <ImCross />
            </button>
          </>
        ) : (
          <>
            <button className="movie-card__favourite" onClick={addToFav}  >
              Add to Favourites <ImHeart style={{ color: "red" }}/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
