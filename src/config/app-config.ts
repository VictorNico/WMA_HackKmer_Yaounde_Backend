import { config } from "dotenv";

config();

export const APP_CONF = {
  port: process.env.PORT!,
  env: process.env.NODE_ENV as "dev" | "prod",
  apiFilesUrl:
    process.env.API_URL_LLP_FILES || "https://default.example.com/matches",
  apiLexUrl:
    process.env.API_URL_WB_LEX_ENT || "https://default.example.com/matches",
  apiClaimsUrl:
    process.env.API_URL_WB_LEX_ENT_CLM || "https://default.example.com/matches",
};
