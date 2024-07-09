import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ClerkProvider } from "@clerk/clerk-react";

/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  const PUBLISHABLE_KEY = "pk_live_Y2xlcmsuZmlsb3QuYWkk";
  const FRONTEND_URL = "https://test.filot.ai";
  root?.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignInUrl={FRONTEND_URL}>
      <FluentProvider theme={webLightTheme}>
        <App title={title} />
      </FluentProvider>
    </ClerkProvider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignInUrl={FRONTEND_URL}>
        <FluentProvider theme={webLightTheme}>
          <NextApp title={title} />
        </FluentProvider>
      </ClerkProvider>
    );
  });
}
