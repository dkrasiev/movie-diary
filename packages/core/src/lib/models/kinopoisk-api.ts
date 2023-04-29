export interface Film {
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

  productionStatus?:
    | "FILMING"
    | "PRE_PRODUCTION"
    | "COMPLETED"
    | "ANNOUNCED"
    | "UNKNOWN"
    | "POST_PRODUCTION";
  type: "FILM" | "VIDEO" | "TV_SERIES" | "MINI_SERIES" | "TV_SHOW";

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

export interface PremiereResponseItem {
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

export enum DistributionType {}

export enum DistributionSubType {}

export interface Distribution {
  type: "LOCAL" | "COUNTRY_SPECIFIC" | "PREMIERE" | "ALL" | "WORLD_PREMIER";
  subType?: "CINEMA" | "DVD" | "DIGITAL" | "BLURAY";
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
