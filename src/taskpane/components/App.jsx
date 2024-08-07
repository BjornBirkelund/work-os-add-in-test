import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import HeroList from "./HeroList";
import TextInsertion from "./TextInsertion";
import { Spinner, makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import { useAuth } from "@workos-inc/authkit-react";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { user, getAccessToken, isLoading, signIn, signUp, signOut } = useAuth();
  if (isLoading) {
    return <Spinner />;
  }

  const performMutation = async () => {
    const accessToken = await getAccessToken();
    console.log("api request with accessToken", accessToken);
  };

  if (user) {
    return (
      <div>
        Hello, {user.email}
        <p>
          <button
            onClick={() => {
              performMutation();
            }}
          >
            Make API Request
          </button>
        </p>
        <p>
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button> <button onClick={() => signUp()}>Sign up</button>
    </>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
