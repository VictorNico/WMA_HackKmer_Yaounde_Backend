import express, { Application } from "express";
import App from "./server";
import { APP_CONF } from "./config/app-config";

(async () => {
  const app: Application = express();

  const { port: PORT, env } = APP_CONF;

  App(app)
    .then(() =>
      app.listen(PORT, () =>
        console.log(
          `\nserver listening on ${env === "dev" ? "http://localhost:" : "port "}${PORT}\n`
        )
      )
    )
    .catch(console.error);
})();
