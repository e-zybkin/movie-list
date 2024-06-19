import { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import { GenreType, FilterParams } from "../../interfaces/movieIntefaces";

import styles from "./SearchForm.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const generateYears = (startYear: number): string[] => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years;
};

const years = generateYears(1990);

interface props {
  handleFilter: (params: FilterParams) => void;
  fetchMovies: () => void;
  allGenres: GenreType[];
}

function SearchForm({ handleFilter, fetchMovies, allGenres }: props) {
  const [genre, setGenre] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);
  const [rating, setRating] = useState<number[]>([0, 10]);

  const handleChangeGenre = (event: SelectChangeEvent<typeof genre>) => {
    const {
      target: { value },
    } = event;
    setGenre(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeYear = (event: SelectChangeEvent<typeof year>) => {
    const {
      target: { value },
    } = event;
    setYear(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeRating = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
  };

  const filterMovies = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      genre,
      year,
      rating,
    };
    handleFilter(formData);
  };

  const clearFilter = () => {
    setGenre([]);
    setYear([]);
    setRating([0, 10]);

    fetchMovies();
  };

  return (
    <form className={styles.filterForm} onSubmit={filterMovies}>
      <div className={styles.inputBox}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="genre-label">Жанр</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-checkbox"
            multiple
            value={genre}
            onChange={handleChangeGenre}
            input={<OutlinedInput label="Жанр" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            name="genre"
          >
            {allGenres.map((movieGenre, i) => (
              <MenuItem key={i} value={movieGenre}>
                <Checkbox checked={genre.indexOf(movieGenre) > -1} />
                <ListItemText primary={movieGenre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="year-label">Год</InputLabel>
          <Select
            labelId="year-label"
            id="year-checkbox"
            multiple
            value={year}
            onChange={handleChangeYear}
            input={<OutlinedInput label="Год" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            name="year"
          >
            {years.map((movieYear, i) => (
              <MenuItem key={i} value={movieYear}>
                <Checkbox checked={year.indexOf(movieYear) > -1} />
                <ListItemText primary={movieYear} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className={styles.rating} sx={{ width: 300 }}>
          <p>Рейтинг Кинопоиска</p>
          <Slider
            value={rating}
            onChange={handleChangeRating}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            name="rating"
          />
        </Box>
      </div>

      <div className={styles.buttonBox}>
        <Button className={styles.button} variant="contained" type="submit">
          Найти
        </Button>

        <Button
          className={styles.button}
          variant="contained"
          color="error"
          type="button"
          onClick={clearFilter}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;
