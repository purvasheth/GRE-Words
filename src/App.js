import React, { useEffect, useState } from "react";
import { startFirebaseUI } from "./Authentication";
import { auth } from "./firebase";
import styled from "@emotion/styled";
import "../node_modules/firebaseui/dist/firebaseui.css";
import "./App.css";
import { Redirect } from "react-router";

const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const H = styled.h1`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Permanent Marker", cursive;
`;

function App() {
  const [islogged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser === null) {
        startFirebaseUI("#firebaseui-auth-container");
      } else {
        setLogged(true);
        localStorage.setItem("authUser", JSON.stringify(authUser));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return islogged ? (
    <Redirect to="/home" />
  ) : (
    <React.Fragment>
      <H>GRE WORDS</H>
      <Div id="firebaseui-auth-container"></Div>
    </React.Fragment>
  );
}

export default App;
