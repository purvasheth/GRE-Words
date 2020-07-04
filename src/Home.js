import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import UserContext from "./UserContext";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { createUserDocument } from "./FirebaseFunctions";
import Grid from "./Grid";

const Button = styled.button`
  padding: 8px 25px;
  background: #0391ce;
  opacity: 0.9;
  color: #fff;
  border-radius: 3px;
  border: transparent;
  position: absolute;
  top: 15px;
  right: 15px;
`;

function Home() {
  const [user, setUser] = useContext(UserContext);
  const [islogged, setLogged] = useState(true);

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, uid, email } = authUser;
        setUser({ displayName, uid, email });
        createUserDocument(authUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return islogged ? (
    <React.Fragment>
      <Button
        onClick={() => {
          auth.signOut();
          setLogged(false);
          setUser({});
        }}
      >
        Sign Out
      </Button>
      <Grid />
    </React.Fragment>
  ) : (
    <Redirect to="/" />
  );
}

export default Home;
