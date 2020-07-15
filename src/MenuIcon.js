import React from "react";
import styled from "@emotion/styled";

const IconLine = styled.div`
  width: 25px;
  height: 3px;
  margin: 3px;
  background-color: white;
`;

const Icon = styled.div`
  display: none;
  @media screen and (max-width: 786px) {
    flex-direction: column;
    cursor: pointer;
    display: flex;
  }
`;

function MenuIcon() {
  return (
    <Icon>
      <IconLine />
      <IconLine />
      <IconLine />
    </Icon>
  );
}

export default MenuIcon;
