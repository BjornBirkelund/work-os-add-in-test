import * as React from "react";
import { useEffect } from "react";
import { useAuth } from "@workos-inc/authkit-react";

const WorkOSAuth = () => {
  const { signIn, user, error } = useAuth();

  //This is the code for the popup where we are checking if the user is authenticated, if not we are signing in
  //It has to be done here instead of the add-in side panel, because of the sandbox nature.
  useEffect(() => {
    if (!user) {
      signIn();
    } else {
      // If we have a user, send a message to the parent window
      Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_SUCCESS", user }));
    }
  }, [user, signIn]);

  if (error) {
    // If we have an error, send an error message to the parent window
    Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_FAILURE", error: error.message }));
    return <div>Authentication error: {error.message}</div>;
  }

  return <div>Authenticating...</div>;
};

export default WorkOSAuth;
