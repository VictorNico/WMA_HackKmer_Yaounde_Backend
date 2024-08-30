import { Request, Response, RequestHandler } from "express";
import { MatchService } from "./match.service"; // import the matching service

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  list: RequestHandler = async (req: Request, res: Response) => {
    try {
      let langCat: string = req.params.lang;
      console.log(langCat);
      const matches = await this.matchService.getMatches(langCat);
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch matches" });
    }
  };
}
