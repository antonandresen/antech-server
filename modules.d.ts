declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    PORT: number;
    NODE_ENV: string;
    GOOGLE_API_KEY: string;
    GOOGLE_REFRESH_TOKEN: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}