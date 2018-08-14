import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAgentApp: Msal.UserAgentApplication;

  constructor() {

    let logger = new Msal.Logger(this.loggerCallback, { level: Msal.LogLevel.Verbose });
    this.userAgentApp = new Msal.UserAgentApplication(
      environment.authConfig.clientID,
      environment.authConfig.authority,
      this.authCallback, {
        logger: logger,
        cacheLocation: 'localStorage',
        redirectUri: environment.authConfig.redirectUri,
        navigateToLoginRequestUrl: false,
        state: 'authconcept'
      }
    );
   }

  getUser(): Msal.User {
    return this.userAgentApp.getUser();
  }

  login(): void {
    this.userAgentApp.loginRedirect(environment.authConfig.scopes);
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
