export interface GenreType {
  name: string;
  slug: string;
}

export interface FilterParams {
  genre: string[];
  year: string[];
  rating: number[];
}


export interface ExternalId {
  kpHD?: string;
  imdb?: string;
  tmdb?: number;
}

export interface Name {
  name: string;
  language?: string;
  type?: string;
}

export interface Rating {
  kp?: number;
  imdb?: number;
  tmdb?: number;
  filmCritics?: number;
  russianFilmCritics?: number;
  await?: number;
}

export interface Votes {
  kp?: string;
  imdb?: number;
  tmdb?: number;
  filmCritics?: number;
  russianFilmCritics?: number;
  await?: number;
}

export interface ShortImage {
  url?: string;
  previewUrl?: string;
}

export interface Video {
  url?: string;
  name?: string;
  site?: string;
  size?: number;
  type?: string;
}

export interface VideoTypes {
  trailers?: Video[];
}

export interface ItemName {
  name: string;
}

export interface PersonInMovie {
  id: number;
  photo?: string;
  name: string;
  enName?: string;
  description?: string;
  profession?: string;
  enProfession?: string;
}

export interface ReviewInfo {
  count?: number;
  positiveCount?: number;
  percentage?: string;
}

export interface SeasonInfo {
  number?: number;
  episodesCount?: number;
}

export interface CurrencyValue {
  value: number;
  currency?: string;
}

export interface Fees {
  world?: CurrencyValue;
  russia?: CurrencyValue;
  usa?: CurrencyValue;
}

export interface Premiere {
  country?: string;
  world?: string;
  russia?: string;
  digital?: string;
  cinema?: string;
  bluray?: string;
  dvd?: string;
}

export interface LinkedMovieV1_4 {
  id: number;
  name?: string;
  enName?: string;
  alternativeName?: string;
  type?: string;
  poster?: ShortImage;
  rating?: Rating;
  year?: number;
}

export interface WatchabilityItem {
  name?: string;
  logo: ShortImage;
  url: string;
}

export interface Watchability {
  items?: WatchabilityItem[];
}

export interface YearRange {
  start: number;
  end: number;
}

export interface Audience {
  count?: number;
  country?: string;
}

export interface NetworkItemV1_4 {
  name: string;
  logo?: ShortImage;
}

export interface Networks {
  items?: NetworkItemV1_4[];
}

export interface Movie {
  id?: number;
  externalId?: ExternalId;
  name?: string;
  alternativeName?: string;
  enName?: string;
  names?: Name[];
  type?: string;
  typeNumber?: number;
  year?: number;
  description?: string;
  shortDescription?: string;
  slogan?: string;
  status?: string;
  facts?: {
    value: string;
    type?: string;
    spoiler?: boolean;
  }[];
  rating?: Rating;
  votes?: Votes;
  movieLength?: number;
  ratingMpaa?: string;
  ageRating?: number;
  logo?: ShortImage;
  poster?: ShortImage;
  backdrop?: ShortImage;
  videos?: VideoTypes;
  genres?: ItemName[];
  countries?: ItemName[];
  persons?: PersonInMovie[];
  reviewInfo?: ReviewInfo;
  seasonsInfo?: SeasonInfo[];
  budget?: CurrencyValue;
  fees?: Fees;
  premiere?: Premiere;
  similarMovies?: LinkedMovieV1_4[];
  sequelsAndPrequels?: LinkedMovieV1_4[];
  watchability?: Watchability;
  releaseYears?: YearRange[];
  top10?: number;
  top250?: number;
  ticketsOnSale?: boolean;
  totalSeriesLength?: number;
  seriesLength?: number;
  isSeries?: boolean;
  audience?: Audience[];
  lists?: string[];
  networks?: Networks;
  updatedAt?: string;
  createdAt?: string;
}