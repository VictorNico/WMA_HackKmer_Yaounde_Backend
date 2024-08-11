import { type RequestHandler } from "express";
import { MatchService } from "./match.service";

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public processMatch: RequestHandler = async (req, res) => {
    const { id, label } = req.body;

    // Validate the parameters
    if (!id || !label) {
      return res
        .status(400)
        .json({ error: "Missing required parameters: id and label" });
    }

    try {
      const result = await this.matchService.processMatch(id, label);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public list: RequestHandler = (req, res) => {
    return res.status(200).json({
      message: "return dictionaries",
    });
  };
}
