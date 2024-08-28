import { APP_CONF } from "../../../../config/app-config";

export class AuthService {
  headers: { "Content-Type": string };
  constructor() {
    //
    this.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  // login
  login = async (code: string) => {
    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: APP_CONF.redirect_url,
      client_id: APP_CONF.client_id,
      client_secret: APP_CONF.client_secret,
    };

    const accessToken = await fetch(`${APP_CONF.access_token_url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    console.log({
      accessToken: accessToken,
    });

    return accessToken;
  };
}
