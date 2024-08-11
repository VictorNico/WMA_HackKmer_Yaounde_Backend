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

  processMatch: RequestHandler = async (req, res) => {
    const { id } = req.body;
    const { label } = req.body;

    try {
      const result = await this.matchService.processMatch(id, label);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}
