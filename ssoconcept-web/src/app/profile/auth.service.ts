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

    // window.localStorage.setItem('msal.idtoken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdfWnVmMXR2a3dMeFlhSFMzcTZsVWpVWUlHdyJ9.eyJhdWQiOiIxZDI4ZmM1ZC05N2UxLTRmYTYtOTM2My1mOTI1MzgzZmU3NWEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3L3YyLjAiLCJpYXQiOjE1MzM3NjA0MDQsIm5iZiI6MTUzMzc2MDQwNCwiZXhwIjoxNTMzNzY0MzA0LCJhaW8iOiJBWFFBaS84SUFBQUFoQ244a0VDelRxdVErY0FBMEZ5MVMxSEcyS2ZoTE5rUElYNjM5SGFpcWlMOUVKL2ZseXhaR3dqRXRvaTdPK2wwWEhUZTVocVg5cnJnN25zRy95ZEcrMFFpb0lGTU43ODJWL1k3ZjJHWk13L1RpQWI1dDBtRXFmRWNwNkk2VFhFYTAvRFg5ZjJzdUE0bVVFUm5KUUFZQXc9PSIsIm5hbWUiOiJOaWNrIFBhdHRlcnNvbiIsIm5vbmNlIjoiZmMxZDI1NmYtMzRiMi00YmJlLTg3NDEtYmNiMDVkNTQ2MWVjIiwib2lkIjoiNjljNmU5MGEtNTMxMS00Njk5LWFiZDEtYTMwOTczMzU0MTFlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibmlwYXR0ZXJAbWljcm9zb2Z0LmNvbSIsInN1YiI6IkltYW5DWUZZWHdoRGhxS25ZcmNfUFBjOFpHZ0JlSTZiUFBoMDBuWjZlQmciLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiI4ZE9jYWZFTWVrLW5pbVV2ci13QUFBIiwidmVyIjoiMi4wIn0.rRfKQ7emy3Vg0Hedbx_aBznlffEYoE11CxniO3JjIXAZUnpKMjfRL0HdaFD0VTBalIs6sWjkB_o78LVpJfzyi97tnUUDMGaHIy8juqz-l73JbSOdKUkLudavVlJ1u_Wav1W8gbqyeKYFuWY7ydE0BB4v940jVt2MjNYR4rF793OJEitg9lp5zsfKmxhGJIoYAbaZm70O3-YI5sEPdNFSgg6L4b20g6yGI_A__3H7c9zZFg9GsTxybYaO5p1zGzq8XF7W05b21A4NqLxLvof7I276VGRCDkUSUuxCz2Dw1LBLOnPV3DV_z-HH3vptTJ-4-RhA6lJ6w2XqPGv6cE8gPA');
    // window.localStorage.setItem('msal.session.state', 'e9f99e0a-2829-40ff-b314-cc5f21b180f3');
    // window.localStorage.setItem('msal.state.login', 'vcaauthconcept');
    // window.localStorage.setItem('msal.client.info', 'eyJ1aWQiOiI2OWM2ZTkwYS01MzExLTQ2OTktYWJkMS1hMzA5NzMzNTQxMWUiLCJ1dGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3In0');

    let logger = new Msal.Logger(this.loggerCallback, { level: Msal.LogLevel.Verbose });
    this.userAgentApp = new Msal.UserAgentApplication(
      this.appConfig.clientID,
      this.appConfig.authority,
      this.authCallback, {
        logger: logger,
        cacheLocation: 'localStorage',
        redirectUri: this.appConfig.redirectUri,
        navigateToLoginRequestUrl: false,
        state: 'vcaauthconcept'
      }
    );


    // if (!this.userAgentApp.isCallback(window.location.hash))
    //   this.userAgentApp.loginRedirect(this.appConfig.scopes);
    // window.onbeforeunload = null;
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
