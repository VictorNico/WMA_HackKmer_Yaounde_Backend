import express, { type Application } from "express";
import path from "path";
import cors, { type CorsOptions } from "cors";

export default async (app: Application) => {
  const cors_options: CorsOptions = {
    origin: "*",
  };

  app.use(cors(cors_options));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/main.html"));
  });

  app.get("/api-docs", (_, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/api-docs/index.html"));
  });

  app.use("/api/v1/", (await import("../api/v1")).default);
  app.use("/api/v2/", (await import("../api/v2")).default);

  app.get("/health", (_, res) => {
    res.status(200).json({
      message: "🚀 server up and running 🚀",
    });
  });

  app.get("*", (_, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/404.html"));
  });
};
