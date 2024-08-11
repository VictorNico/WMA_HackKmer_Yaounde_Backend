import express, { type Application } from "express";
import { authRouter } from "../routes/auth-router";
import { languageRouter } from "../routes/language-router";
import { matchRouter } from "../routes/match-router";
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

  app.use("/auth", authRouter);
  app.use("/languages", languageRouter);
  app.use("/match/publish", matchRouter);

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
