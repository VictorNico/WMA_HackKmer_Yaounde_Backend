import { type RequestHandler } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  index: RequestHandler = async (req, res) => {
    const { code } = req.body;
    const accessToken = await this.authService.login(code);
    console.log("code", code);

    return await res.json(accessToken.body);

    // return res.status(200).json({
    //   message: "Intergrade wikimedia OAuth 1.0a",
    // });
  };
}
