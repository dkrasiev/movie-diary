/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly KINOPOISK_API_TOKEN: string;
  readonly REDIS_URL: string;
  readonly API_URL: string;
  readonly JWT_ACCESS_KEY: string;
  readonly JWT_REFRESH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
