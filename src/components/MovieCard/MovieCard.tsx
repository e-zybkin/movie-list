import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { Movie } from "../../interfaces/movieIntefaces";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const ratingClass: string =
    movie.rating?.kp || movie.rating?.imdb ? styles.rating : "";

  return (
    <Link
      to={`/${movie.id}`}
      className={styles.card}
      style={{
        ...(movie.poster?.previewUrl && {
          backgroundImage: `url(${movie.poster.previewUrl})`,
        }),
      }}
    >
      <p className={ratingClass}>
        {movie.rating?.kp && movie.rating.kp > 0
          ? movie.rating.kp
          : movie.rating?.imdb && movie.rating.imdb > 0
          ? movie.rating.imdb
          : ""}
      </p>

      <div className={styles.infoBlock}>
        <p className={styles.name}>
          {movie.name ? movie.name : movie.alternativeName}
        </p>
        <p className={styles.year}>{movie.year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
