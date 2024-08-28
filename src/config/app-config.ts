import { config } from "dotenv";

config();

export const APP_CONF = {
  port: process.env.PORT!,
  env: process.env.NODE_ENV as "dev" | "prod",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.SECRET,
  wikiDataUrl: process.env.WIKIDATA_URL,
  access_token_url: process.env.ACCESS_TOKEN_URL,
  redirect_url: process.env.REDIRECT_URL,
};
