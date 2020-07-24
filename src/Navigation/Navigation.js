import React, { useState } from "react";
import styled from "@emotion/styled";
import { auth } from "../firebase";
import { Redirect } from "react-router";
import { colors } from "../Components";
import { useHistory } from "react-router-dom";
import MenuIcon from "./MenuIcon";

const Navbar = styled.div`
  background-color: ${colors.blue};
  width: 100%;
  display: flex;
  color: white;
  @media screen and (max-width: 786px) {
    flex-direction: column;
  }
`;

const NavbarLink = styled.div`
  cursor: pointer;
  display: flex;
  padding: 15px 20px;
  align-items: center;
  background-color: ${(props) =>
    props.blank ? "inherit" : props.select ? colors.darkblue : "inherit"};
  @media screen and (max-width: 786px) {
    flex-direction: row;
    justify-content: space-between;
    background-color: inherit;
    width: 100%;
    order: ${(props) => (props.select ? 0 : 1)};
    display: ${(props) =>
      props.toggle ? "flex" : props.select ? "flex" : "none"};
    z-index: ${(props) => (props.toggle ? "99" : "auto")};
  }
`;

function Navigation({ select }) {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [islogged, setLogged] = useState(true);

  function signOut() {
    auth.signOut();
    setLogged(false);
    localStorage.removeItem("authUser");
  }

  function route(path) {
    setToggle((prevState) => !prevState);
    history.push({
      pathname: path,
    });
  }

  return islogged ? (
    <React.Fragment>
      <Navbar>
        <NavbarLink
          toggle={toggle}
          select={select === "home"}
          onClick={() => {
            route("/home");
          }}
        >
          Home
          {select === "home" && <MenuIcon />}
        </NavbarLink>

        <NavbarLink
          toggle={toggle}
          select={select === "stats"}
          onClick={() => {
            route("/stats");
          }}
        >
          Stats
          {select === "stats" && <MenuIcon />}
        </NavbarLink>

        <NavbarLink
          toggle={toggle}
          select={select === "revision"}
          onClick={() => {
            route("/revision");
          }}
        >
          Revise
          {select === "revision" && <MenuIcon />}
        </NavbarLink>
        <NavbarLink
          blank
          style={{ justifyContent: "flex-end" }}
          toggle={toggle}
          select={select === "none"}
          onClick={() => {
            setToggle((prevState) => !prevState);
          }}
        >
          {select === "none" && <MenuIcon />}
        </NavbarLink>

        <NavbarLink
          toggle={toggle}
          style={{ order: "2", marginLeft: "auto" }}
          onClick={signOut}
        >
          SignOut
        </NavbarLink>
      </Navbar>
    </React.Fragment>
  ) : (
    <Redirect to="/" />
  );
}

export default Navigation;
