import { type RequestHandler } from "express";
import { MatchService } from "./match.service";

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  list: RequestHandler = (req, res) => {
    return res.status(200).json({
      message: "return dictionaries",
    });
  };
}
