import { Router } from "express";
import { authRouter } from "./routes/auth-router";
import { languageRouter } from "./routes/language-router";
import { matchRouter } from "./routes/match-router";

const routerV1 = Router();

routerV1.get("/", (_, res) => {
  return res.status(200).json({
    message: "🚀 wiki-lex-match V1 🚀",
  });
});

routerV1.use("/auth", authRouter);
routerV1.use("/languages", languageRouter);
routerV1.use("/match/publish", matchRouter);

export default routerV1;
