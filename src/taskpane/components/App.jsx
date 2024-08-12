import * as React from "react";
import { useState, useEffect } from "react";
import { Spinner, makeStyles } from "@fluentui/react-components";
import { useAuth } from "@workos-inc/authkit-react";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { isLoading, signOut } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userId, setUserId] = useState("");
  const styles = useStyles();

  useEffect(() => {
    if (!userId && !isAuthenticating && !isLoading) {
      handleSignIn();
    }
  }, [userId, isAuthenticating, isLoading]);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      await Office.context.ui.displayDialogAsync(
        "https://localhost:3000/auth.html",
        { height: 60, width: 30 },
        //below is a callback function that is called when the dialog is opened
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            const dialog = result.value;
            dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
              const message = JSON.parse(arg.message);
              //if we are recieving a success message, we close the dialog and set the userId
              if (message.type === "AUTH_SUCCESS") {
                dialog.close();
                setIsAuthenticating(false);
                setUserId(message.user.id);
              } else if (message.type === "AUTH_FAILURE") {
                //if we are recieving a failure message, we close the dialog and set the userId to an empty string
                setUserId("");
                dialog.close();
                setIsAuthenticating(false);
                console.error("Authentication failed:", message.error);
              }
            });
          } else {
            setIsAuthenticating(false);
            console.error("Error opening dialog:", result.error.message);
          }
        }
      );
    } catch (error) {
      setIsAuthenticating(false);
      console.error("Error in handleSignIn:", error);
    }
  };

  if (isLoading || isAuthenticating) {
    return <Spinner />;
  }

  if (userId) {
    return (
      <div className={styles.root}>
        <h1>Welcome, {userId}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return null;
};

export default App;
