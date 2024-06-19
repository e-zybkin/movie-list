import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieCardList.module.css";
import SearchForm from "../SearchForm/SearchForm";

import { Movie, GenreType } from "../../interfaces/movieIntefaces";

interface props {
  movies: Movie[];
  pages: number;
  handleChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  handleFilter: (params: {
    genre: string[];
    year: string[];
    rating: number[];
  }) => void;
  isLoading: boolean;
  fetchMovies: () => void;
  allGenres: GenreType[];
}

function MovieCardList({
  movies,
  pages,
  handleChange,
  handleFilter,
  isLoading,
  fetchMovies,
  allGenres,
}: props) {
  return (
    <div className={styles.mainBlock}>
      <SearchForm
        handleFilter={handleFilter}
        fetchMovies={fetchMovies}
        allGenres={allGenres}
      />
      {isLoading ? (
        <CircularProgress className={styles.progress} />
      ) : (
        <>
          <div className={styles.cardsBlock}>
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>

          <Pagination
            className={styles.pagination}
            count={pages}
            color="primary"
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
}

export default MovieCardList;
