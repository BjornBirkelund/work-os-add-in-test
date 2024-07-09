import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import HeroList from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import { SignedIn, SignIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Box, CircularProgress, Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = React.useState(!isLoaded);

  React.useEffect(() => {
    if (isLoaded) {
      setLoading(false);
      // Placeholder for getExcelInfo and awaitFetchFiles functions
      console.log("User loaded, fetching Excel info and files...");
    }
  }, [isLoaded]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  return (
    <div className={styles.root}>
      <SignedIn>
        <Box sx={{ marginRight: "3px", marginTop: "3px", display: "flex", justifyContent: "flex-end" }}>
          <UserButton />
        </Box>
        <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
        <HeroList message="Discover what this add-in can do for you today!" items={listItems} />
        <TextInsertion insertText={insertText} />
      </SignedIn>
      <SignedOut>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, height: "100vh" }}>
          <Typography sx={{ mb: 2 }} variant="h6" align="center">
            Welcome to Filot, your AI Financial Co-Pilot
          </Typography>
          <Typography sx={{ mb: 2 }}>Click below to Sign In</Typography>
          <SignIn
            // signUpUrl="/sign-up"
            afterSignInUrl="/taskpane.html"
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              marginBottom: "12px",
            }}
          >
            Sign In
          </SignIn>
          <Typography variant="caption">(Refresh Add-In window to complete sign in)</Typography>
        </Box>
      </SignedOut>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
