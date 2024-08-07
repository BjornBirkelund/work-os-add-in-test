import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useAuth, AuthKitProvider } from "@workos-inc/authkit-react";

/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <AuthKitProvider clientId="client_01J4Q0J2F830SXK60KBGG9WP9Z">
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
