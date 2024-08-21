import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Spinner, makeStyles, Button } from "@fluentui/react-components";
import { useAuth } from "@workos-inc/authkit-react";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { isLoading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userId, setUserId] = useState("");
  const [justSignedOut, setJustSignedOut] = useState(false);
  const styles = useStyles();

  const handleSignOut = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      await Office.context.ui.displayDialogAsync(
        "https://work-os-addin.filot.ai/auth.html?action=signout",
        { height: 60, width: 30 },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            const dialog = result.value;
            dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
              const message = JSON.parse(arg.message);
              console.log("SIGN OUT MESSAGE", message);
              if (message.type === "SIGN_OUT_COMPLETE") {
                dialog.close();
                setUserId("");
                setJustSignedOut(true);
                console.log("User signed out successfully");
                setTimeout(() => setJustSignedOut(false), 2000); // Reset after 2 seconds
              } else if (message.type === "SIGN_OUT_ERROR") {
                dialog.close();
                console.error("Error signing out:", message.error);
              }
              setIsAuthenticating(false);
            });
          }
        }
      );
    } catch (error) {
      console.error("Error opening sign-out dialog:", error);
      setIsAuthenticating(false);
    }
  }, []);

  const handleSignIn = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      await Office.context.ui.displayDialogAsync(
        "https://work-os-addin.filot.ai/auth.html",
        { height: 60, width: 30 },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            const dialog = result.value;
            dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
              const message = JSON.parse(arg.message);
              if (message.type === "AUTH_SUCCESS") {
                dialog.close();
                setUserId(message.user.id);
              } else if (message.type === "AUTH_FAILURE") {
                dialog.close();
                console.error("Authentication failed:", message.error);
              }
              setIsAuthenticating(false);
            });
          }
        }
      );
    } catch (error) {
      console.error("Error opening sign-in dialog:", error);
      setIsAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    if (!userId && !isAuthenticating && !justSignedOut) {
      handleSignIn();
    }
  }, [userId, isAuthenticating, justSignedOut, handleSignIn]);

  if (isLoading || isAuthenticating) {
    return (
      <>
        <Spinner /> <p>No one is signed in...</p>
      </>
    );
  }

  if (userId) {
    return (
      <div className={styles.root}>
        <h1>Welcome, {userId}</h1>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <p>No one is signed in...</p>
        <Button onClick={handleSignIn}>Sign In</Button>
      </div>
    );
  }
};

export default App;
