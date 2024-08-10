import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";

const router = Router();

const authController = new AuthController();

router.get("/", authController.index.bind(authController));

export const authRouter = router;
