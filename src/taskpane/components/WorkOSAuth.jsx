import * as React from "react";
import { useEffect } from "react";
import { useAuth } from "@workos-inc/authkit-react";

const WorkOSAuth = () => {
  const { signIn, signOut, user, error } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get("action");

    const handleSignOut = async () => {
      try {
        console.log("user before sign out", user);
        await signOut();
        console.log("user after sign out", user);
        // Wait for a short time to ensure the signOut has taken effect
        await new Promise(resolve => setTimeout(resolve, 500));
        const currentUser = await useAuth().getUser();
        if (!currentUser) {
          Office.context.ui.messageParent(JSON.stringify({ type: "SIGN_OUT_COMPLETE" }));
        } else {
          throw new Error("Sign out failed");
        }
      } catch (error) {
        Office.context.ui.messageParent(JSON.stringify({ type: "SIGN_OUT_ERROR", error: error.message }));
      }
    };

    console.log("user before if sequence", user);
    if (action === "signout") {
      handleSignOut();
    } else if (!user) {
      signIn();
    } else {
      Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_SUCCESS", user }));
    }
  }, [user, signIn, signOut]);

  if (error) {
    Office.context.ui.messageParent(JSON.stringify({ type: "AUTH_FAILURE", error: error.message }));
    return <div>Authentication error: {error.message}</div>;
  }

  return <div>Processing authentication...</div>;
};

export default WorkOSAuth;