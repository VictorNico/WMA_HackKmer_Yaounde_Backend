import { Router } from "express";
import { LanguageController } from "../modules/languages/language.controller";

const router = Router();

const languageController = new LanguageController();

router.get("/", languageController.getAllLanguageList.bind(languageController));





export const languageRouter = router;
