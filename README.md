WPF/CEF SSO Concept
=======================

The WPF Sample project was taken from: https://github.com/cefsharp/CefSharp.MinimalExample

## Prerequisites
1. Create an Azure AD _client_ application registration in your tenant and make note of the Application ID (aka Client ID) and Tenant ID
2. Create another Azure AD _web_ application registration in your tenant and make note of the Application ID (aka Client ID) and Tenant ID
4. Open the `CefSharp.MinimalExample.Wpf/app.config` file and update the following fields:
    - `ida:Tenant`
    - `ida:ClientId`
    - `ida:RedirectUri`
5. Open the `ssoconcept-web/src/environments/environment.ts` file and update the following properties of the authConfig object:
    - `clientID`
    - `authority`

## Steps to Start Project
1. Open command prompt and CD to the `ssoconcept-web` directory
2. Run `npm install`
3. Run `ng start` (you may need to install the Angular CLI first by running `npm install -g @angular/cli`)
4. Start Visual Studio and open the CefSharp.MinimalExample.sln solution
5. Set the default project to CefSharp.MinimalExample.Wpf and hit F5
6. Make sure the browser page loads initially
7. Click the Sign In button at the top of the WPF app and follow prompts to sign in with your Azure AD credentials
8. You should see the page refresh with the user info displayed in the browser

## Notable Code
The code that makes this work is in the MainWindow.xaml.cs file of the CefSharp.MinimalExample.Wpf project. In it, you will find a method called `GenerateJscript()` which does the work of setting the loaded browser's localStorage with key/values required by the Microsoft Authentication Library (MSAL). 

Specifically, `msal.idtoken` is set to the ID token returned from the login and `msal.client.info` is manually constructed and base64 encoded with the user and tenant IDs. This tricks the MSAL into thinking it's already authenticated the user. 

**Important:** Additional key/values may need to be set to make MSAL function 100%. This is merely a prototype.