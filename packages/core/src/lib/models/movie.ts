export enum PorudctionStatus {
  FILMING = "FILMING",
  PRE_PRODUCTION = "PRE_PRODUCTION",
  COMPLETED = "COMPLETED",
  ANNOUNCED = "ANNOUNCED",
  UNKNOWN = "UNKNOWN",
  POST_PRODUCTION = "POST_PRODUCTION",
}

export enum MovieType {
  FILM = "FILM",
  VIDEO = "VIDEO",
  TV_SERIES = "TV_SERIES",
  MINI_SERIES = "MINI_SERIES",
  TV_SHOW = "TV_SHOW",
}

export interface Movie {
  kinopoiskId: number;
  imdbId?: string;

  nameRu?: string;
  nameEn?: string;
  nameOriginal?: string;

  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string;
  logoUrl?: string;

  reviewsCount: number;

  ratingGoodReview?: number;
  ratingGoodReviewVoteCount?: number;

  ratingKinopoisk?: number;
  ratingKinopoiskVoteCount?: number;

  raingImdb?: number;
  raingImdbVoteCount?: number;

  ratingFilmCritics?: number;
  ratingFilmCriticsVoteCount?: number;

  ratingAwait?: number;
  ratingAwaitCount?: number;

  ratingRfCritics?: number;
  ratingRfCriticsVoteCount?: number;

  webUrl: string;

  year?: number;
  filmLength?: number;

  slogan?: string;
  description?: string;
  shortDescription?: string;
  editorAnnotation?: string;

  isTicketsAvailable: boolean;

  productionStatus?: PorudctionStatus;
  type: MovieType;

  ratingMpaa?: string;
  ratingAgeLimits?: string;
  hasImax?: string;
  has3D?: string;

  lastSync: string;

  countries: Country[];
  genres: Genre[];

  startYear?: number;
  endYear?: number;

  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
}

export interface PremierResponseItem {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  duration: number;
  premiereRu: string;

  countries: Country[];
  genres: Genre[];
}

export enum DistributionType {
  LOCAL = "LOCAL",
  COUNTRY_SPECIFIC = "COUNTRY_SPECIFIC",
  PREMIERE = "PREMIERE",
  ALL = "ALL",
  WORLD_PREMIER = "WORLD_PREMIER",
}

export enum DistributionSubType {
  CINEMA = "CINEMA",
  DVD = "DVD",
  DIGITAL = "DIGITAL",
  BLURAY = "BLURAY",
}

export interface Distribution {
  type: DistributionType;
  subType?: DistributionSubType;
  date?: string;
  reRelease?: boolean;
  country?: Country;
  companies: Company;
}

export interface Company {
  name: string;
}

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}
