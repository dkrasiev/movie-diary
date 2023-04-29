/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  MovieRatings = "movie_ratings",
  Movies = "movies",
  Premieres = "premieres",
  Subscriptions = "subscriptions",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type MovieRatingsRecord = {
  movie?: RecordIdString;
  ratingGoodReview?: number;
  ratingGoodReviewVoteCount?: number;
  ratingKinopoisk?: number;
  ratingKinopoiskVoteCount?: number;
  ratingImdb?: number;
  ratingImdbVoteCount?: number;
  ratingFilmCritics?: number;
  ratingFilmCriticsVoteCount?: number;
  ratingAwait?: number;
  ratingAwaitCount?: number;
  ratingRfCritics?: number;
  ratingRfCriticsVoteCount?: number;
};

export enum MoviesTypeOptions {
  "FILM" = "FILM",
  "VIDEO" = "VIDEO",
  "TV_SERIES" = "TV_SERIES",
  "MINI_SERIES" = "MINI_SERIES",
  "TV_SHOW" = "TV_SHOW",
}

export enum MoviesProductionStatusOptions {
  "FILMING" = "FILMING",
  "PRE_PRODUCTION" = "PRE_PRODUCTION",
  "COMPLETED" = "COMPLETED",
  "ANNOUNCED" = "ANNOUNCED",
  "UNKNOWN" = "UNKNOWN",
  "POST_PRODUCTION" = "POST_PRODUCTION",
}
export type MoviesRecord = {
  nameRu?: string;
  nameEn?: string;
  nameOriginal?: string;
  posterUrl?: string;
  posterUrlPreview?: string;
  coverUrl?: string;
  logoUrl?: string;
  reviewsCount?: number;
  webUrl?: number;
  year?: number;
  filmLength?: number;
  slogan?: string;
  description?: string;
  shortDescription?: string;
  editorAnnotation?: string;
  isTicketsAvailable?: boolean;
  type?: MoviesTypeOptions;
  productionStatus?: MoviesProductionStatusOptions;
  ratingMpaa?: number;
  ratingAgeLimits?: number;
  hasImax?: boolean;
  has3D?: boolean;
  lastSync?: string;
  startYear?: number;
  endYear?: number;
  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
};

export type PremieresRecord = {
  movie?: RecordIdString;
  premiereRu?: string;
  year?: number;
  month?: string;
};

export type SubscriptionsRecord = {
  user?: RecordIdString;
  premiere?: RecordIdString;
};

export type UsersRecord = {
  avatar?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type MovieRatingsResponse<Texpand = unknown> = MovieRatingsRecord &
  BaseSystemFields<Texpand>;
export type MoviesResponse = MoviesRecord & BaseSystemFields;
export type PremieresResponse<Texpand = unknown> = PremieresRecord &
  BaseSystemFields<Texpand>;
export type SubscriptionsResponse<Texpand = unknown> = SubscriptionsRecord &
  BaseSystemFields<Texpand>;
export type UsersResponse = UsersRecord & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  movie_ratings: MovieRatingsRecord;
  movies: MoviesRecord;
  premieres: PremieresRecord;
  subscriptions: SubscriptionsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  movie_ratings: MovieRatingsResponse;
  movies: MoviesResponse;
  premieres: PremieresResponse;
  subscriptions: SubscriptionsResponse;
  users: UsersResponse;
};
