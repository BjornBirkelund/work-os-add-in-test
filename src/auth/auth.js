import * as React from "react";
import { createRoot } from "react-dom/client";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import WorkOSAuth from "../taskpane/components/WorkOSAuth";

Office.initialize = function () {
  const container = document.getElementById("auth-root");
  const root = createRoot(container);

  root.render(
    // <AuthKitProvider clientId="client_01J4Q0J2F830SXK60KBGG9WP9Z" redirectUri="https://localhost:3000/auth.html"></AuthKitProvider>
    <AuthKitProvider
      apiHostname="work-os-addin.filot.ai"
      clientId="client_01J4Q0J2NYCFEPTYZR2W4GV4NC"
      redirectUri="https://work-os-addin.filot.ai/auth.html"
    >
      <WorkOSAuth />
    </AuthKitProvider>
  );
};

// Handle the redirect back from WorkOS
if (window.location.search.includes("code=")) {
  Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_CALLBACK" }));
}

window.onerror = function (message, source, lineno, colno, error) {
  console.error("Unhandled error:", error);
  Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_FAILURE", error: message }));
};
