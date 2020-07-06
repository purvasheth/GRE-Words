import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import UserContext from "./UserContext";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { createUserDocument } from "./FirebaseFunctions";
import Grid from "./Grid";

//TODO: Add Navigation on top which is responsive and remove this button.
const Button = styled.button`
  padding: 8px 25px;
  background: #0391ce;
  color: #fff;
  border-radius: 3px;
  border: transparent;
  position: absolute;
  top: 15px;
  right: 15px;
`;

function Home() {
  const [islogged, setLogged] = useState(true);

  return islogged ? (
    <React.Fragment>
      <Button
        onClick={() => {
          auth.signOut();
          setLogged(false);
          localStorage.removeItem("authUser");
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
