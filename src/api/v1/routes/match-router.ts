import { Router } from "express";
import { MatchController } from "../modules/match/match.controller";

const router = Router();

const matchController = new MatchController();

router.post("/", matchController.processMatch);

export const matchRouter = router;
