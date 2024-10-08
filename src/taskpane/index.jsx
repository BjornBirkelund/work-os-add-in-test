import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { AuthKitProvider } from "@workos-inc/authkit-react";

/* global document, Office, module, require */

const title = "Contoso Tak Pane Add-in";

const rootElement = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    // <AuthKitProvider clientId="client_01J4Q0J2F830SXK60KBGG9WP9Z" redirectUri="https://localhost:3000/auth.html">
    <AuthKitProvider
      clientId="client_01J4Q0J2NYCFEPTYZR2W4GV4NC"
      apiHostname="auth.filot.ai"
      redirectUri="https://work-os-addin.filot.ai/auth.html"
    >
      <FluentProvider theme={webLightTheme}>
        <App title={title} />
      </FluentProvider>
    </AuthKitProvider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
