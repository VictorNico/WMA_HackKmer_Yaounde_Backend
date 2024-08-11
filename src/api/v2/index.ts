import { Router } from "express";

const routerV2 = Router();

routerV2.get("/", (_, res) => {
  return res.status(200).json({
    message: "🚀 wiki-lex-match V2 🚀",
  });
});

routerV2.get("*", (_, res) => {
  return res.status(200).json({
    message: "API v2 is not yet available",
  });
});

export default routerV2;
