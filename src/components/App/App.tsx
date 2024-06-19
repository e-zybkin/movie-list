import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MovieCardList from "../MovieCardList/MovieCardList";
import MoviePage from "../MoviePage/MoviePage";
import PageNotFound from "../PageNotFound/PageNotFound";

import * as moviesApi from "../../utils/kinopoiskApi";
import { Movie } from "../../interfaces/movieIntefaces";

import styles from "./App.module.css";

function App() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>({});
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [countPages, setCountPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    moviesApi.getAllGenres().then((res) => {
      setAllGenres(
        res.reduce((arr, el) => {
          arr.push(el.name);
          return arr;
        }, [])
      );
    });
    fetchMovies();
  }, []);

  const handleCountChange = (e, page: number) => {
    fetchMovies({ page });
  };

  const handleFilterMovies = (value) => {
    fetchMovies(value);
  };

  function fetchMovies(params = {}) {
    setIsLoading(true);
    moviesApi
      .getAllMovies(params)
      .then((res) => {
        setAllMovies(res.docs);
        setCountPages(res.pages);
      })
      .catch((err) => {
        console.error("Возникла ошибка:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchMovieInfo(id: string): void {
    setIsLoading(true);
    moviesApi
      .getMovieById(id)
      .then((res) => {
        setMovie(res);
      })
      .catch((err) => {
        console.error("Возникла ошибка:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Routes>
          <Route
            path="/"
            element={
              <MovieCardList
                movies={allMovies}
                pages={countPages}
                handleChange={handleCountChange}
                handleFilter={handleFilterMovies}
                isLoading={isLoading}
                fetchMovies={fetchMovies}
                allGenres={allGenres}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <MoviePage
                fetchMovie={fetchMovieInfo}
                movie={movie}
                isLoading={isLoading}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
