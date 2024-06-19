import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Movie, ItemName } from "../../interfaces/movieIntefaces";
import styles from "./MoviePage.module.css";

interface props {
  fetchMovie: (id: string | undefined) => void;
  movie: Movie;
  isLoading: boolean;
}

function MoviePage({ fetchMovie, movie, isLoading }: props) {
  const { id } = useParams();

  useEffect(() => {
    fetchMovie(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress className={styles.progress} />
      ) : Object.keys(movie).length === 0 ? (
        <p>Такого фильма нет</p>
      ) : (
        <div className={styles.movieBlock}>
          {movie.poster?.url && (
            <img
              className={styles.poster}
              src={movie.poster.url}
              alt={movie.name || movie.alternativeName}
            />
          )}

          <h2 className={styles.name}>
            {movie.name ? movie.name : movie.alternativeName}
          </h2>

          <p className={styles.description}>{movie.description}</p>

          <p className={styles.rating}>
            {movie.rating?.kp && movie.rating.kp > 0
              ? `Рейтинг Кинопоиска: ${movie.rating.kp}`
              : movie.rating?.imdb && movie.rating.imdb > 0
              ? `Рейтинг IMDB: ${movie.rating.imdb}`
              : ""}
          </p>

          <p className={styles.year}>Год выхода: {movie.year}</p>

          <ul className={styles.genres}>
            {movie.genres?.map((genre: ItemName, i: number) => (
              <li key={i}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MoviePage;
