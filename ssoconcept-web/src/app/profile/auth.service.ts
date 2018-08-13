import { Injectable } from '@angular/core';
import * as Msal from 'msal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAgentApp: Msal.UserAgentApplication;
  private appConfig = {
    clientID: '1d28fc5d-97e1-4fa6-9363-f925383fe75a',
    authority: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47',
    scopes: ["openid"],
    redirectUri: 'http://localhost:4200'
  };

  constructor() {

    let logger = new Msal.Logger(this.loggerCallback, { level: Msal.LogLevel.Verbose });
    this.userAgentApp = new Msal.UserAgentApplication(
      this.appConfig.clientID,
      this.appConfig.authority,
      this.authCallback, {
        logger: logger,
        cacheLocation: 'localStorage',
        redirectUri: this.appConfig.redirectUri,
        navigateToLoginRequestUrl: false,
        state: 'authconcept'
      }
    );
   }

  getUser(): Msal.User {
    return this.userAgentApp.getUser();
  }

  login(): void {
    this.userAgentApp.loginRedirect(this.appConfig.scopes);
  }

  logout(): void {
    this.userAgentApp.logout();
  }

  authCallback(errorDesc, token, error, tokenType): void {
    if (token) {
      console.log("Success: " + token);
    } else {
      console.log(error + ":" + errorDesc);
    }
  }

  loggerCallback(logLevel, message) {
    console.log(message);
  }
}
