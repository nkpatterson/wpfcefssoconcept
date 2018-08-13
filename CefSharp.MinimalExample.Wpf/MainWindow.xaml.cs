using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Configuration;
using System.Globalization;
using System.Text;
using System.Windows;

namespace CefSharp.MinimalExample.Wpf
{
    public partial class MainWindow : Window
    {
        private static string aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
        private static string tenant = ConfigurationManager.AppSettings["ida:Tenant"];
        private static string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
        Uri redirectUri = new Uri(ConfigurationManager.AppSettings["ida:RedirectUri"]);

        private static string authority = String.Format(CultureInfo.InvariantCulture, aadInstance, tenant);

        private static string todoListResourceId = ConfigurationManager.AppSettings["todo:TodoListResourceId"];
        private static string todoListBaseAddress = ConfigurationManager.AppSettings["todo:TodoListBaseAddress"];

        private AuthenticationContext authContext = null;
        private static AuthenticationResult authResult = null;

        // Button strings
        const string signInString = "Sign In";
        const string clearCacheString = "Clear Cache";

        public MainWindow()
        {
            InitializeComponent();
            Browser.RenderProcessMessageHandler = new RenderProcessMessageHandler();
            authContext = new AuthenticationContext(authority, new FileCache());
        }

        private async void LogIn_ClickAsync(object sender, RoutedEventArgs e)
        {
            if (LogInButton.Content.ToString() == clearCacheString)
            {
                authContext.TokenCache.Clear();
                LogInButton.Content = signInString;
                UserName.Content = "";
                authResult = null;
                Browser.Load(Browser.Address);
                return;
            }

            try
            {
                // Force a sign-in (PromptBehavior.Always), as the ADAL web browser might contain cookies for the current user, and using .Auto
                // would re-sign-in the same user
                authResult = await authContext.AcquireTokenAsync(todoListResourceId, clientId, redirectUri, new PlatformParameters(PromptBehavior.Always));
                LogInButton.Content = clearCacheString;
                SetUserName(authResult.UserInfo);

                Browser.Load(Browser.Address);
            }
            catch (AdalException ex)
            {
                if (ex.ErrorCode == "access_denied")
                {
                    // The user canceled sign in, take no action.
                }
                else
                {
                    // An unexpected error occurred.
                    string message = ex.Message;
                    if (ex.InnerException != null)
                    {
                        message += "Error Code: " + ex.ErrorCode + "Inner Exception : " + ex.InnerException.Message;
                    }

                    MessageBox.Show(message);
                }

                UserName.Content = "";

                return;
            }
        }

        public static string GenerateJscript()
        {
            if (authResult == null)
            {
                return "window.localStorage.clear();";
            }

            var sb = new StringBuilder();
            var clientInfo = $"{{\"uid\": \"{authResult.UserInfo.UniqueId}\", \"utid\": \"{authResult.TenantId}\" }}";
            var clientInfoEncoded = Convert.ToBase64String(Encoding.Default.GetBytes(clientInfo));

            sb.AppendLine($"window.localStorage.setItem('msal.idtoken', '{authResult.IdToken}');");
            sb.AppendLine($"window.localStorage.setItem('msal.client.info', '{clientInfoEncoded}');");
            // May need to set additional tokens. Verify functionality of MSAL.

            return sb.ToString();
        }

        // Set user name to text box
        private void SetUserName(UserInfo userInfo)
        {
            string userName = null;

            if (userInfo != null)
            {
                if (userInfo.GivenName != null && userInfo.FamilyName != null)
                {
                    userName = userInfo.GivenName + " " + userInfo.FamilyName;
                }
                else if (userInfo.FamilyName != null)
                {
                    userName = userInfo.FamilyName;
                }
                else if (userInfo.GivenName != null)
                {
                    userName = userInfo.GivenName;
                }
                else if (userInfo.UniqueId != null)
                {
                    userName = userInfo.UniqueId;
                }
            }

            if (userName == null)
                userName = "";

            UserName.Content = userName;
        }

        public class RenderProcessMessageHandler : IRenderProcessMessageHandler
        {
            public void OnContextCreated(IWebBrowser browserControl, IBrowser browser, IFrame frame)
            {
                frame.ExecuteJavaScriptAsync(GenerateJscript());
            }

            public void OnContextReleased(IWebBrowser browserControl, IBrowser browser, IFrame frame)
            {
            }

            public void OnFocusedNodeChanged(IWebBrowser browserControl, IBrowser browser, IFrame frame, IDomNode node)
            {
            }

            public void OnUncaughtException(IWebBrowser browserControl, IBrowser browser, IFrame frame, JavascriptException exception)
            {
            }
        }
    }
}
