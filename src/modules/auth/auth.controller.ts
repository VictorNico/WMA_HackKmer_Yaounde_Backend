import { type RequestHandler } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  index: RequestHandler = (req, res) => {
    return res.status(200).json({
      message: "Intergrade wikimedia OAuth 1.0a",
    });
  };
}
