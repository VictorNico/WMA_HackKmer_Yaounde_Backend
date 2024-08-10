import { config } from "dotenv";

config();

export const APP_CONF = {
  port: process.env.PORT!,
  env: process.env.NODE_ENV as "dev" | "prod",
};
