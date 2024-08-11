import { Router } from "express";
import { MatchController } from "../modules/match/match.controller";

const router = Router();

const matchController = new MatchController();

router.get("/", matchController.list.bind(matchController));
router.post("/match/publish", matchController.processMatch);

export const matchRouter = router;
