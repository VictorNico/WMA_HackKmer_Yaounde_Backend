import { type RequestHandler } from "express";
import { LanguageService } from "./language.service";

export class LanguageController {
  private languageService: LanguageService;

  constructor() {
    this.languageService = new LanguageService();
  }

  getAllLanguageList: RequestHandler = (req, res) => {
    return res.status(200).json({
      message: "return languages",
    });
  };
}
