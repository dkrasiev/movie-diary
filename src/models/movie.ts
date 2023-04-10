export interface Movie extends MovieShort {
  description: string;
  nameOriginal: string;
}

export interface MovieShort {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: {
    country: string;
  }[];
  genres: {
    genre: string;
  }[];
  duration: number;
  premiereRu: string;
}
