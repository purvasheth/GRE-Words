import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { fetchWords, fetchStore } from "./FirebaseFunctions";
import { Button } from "./Components";
import UserContext from "./UserContext";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 210px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const P = styled.p`
  margin: 10px 0px 40px 0px;
  width: 200px;
  height: 0px;
  text-align: center;
  font-family: "Merriweather", serif;
  font-size: 2rem;
  color: #072f5f;
`;

function Grid() {
  const [sets] = useState(Array.from(Array(40).keys()));
  const [user] = useContext(UserContext);
  const history = useHistory();

  const handleClick = async (num, path) => {
    const newWords = await fetchWords(num);

    if (path.includes("list")) {
      history.push({
        pathname: path,
        state: { newWords },
      });
    } else {
      //get store as well
      const initialState = await fetchStore(user.uid, num, newWords);
      history.push({
        pathname: path,
        state: { newWords, initialState },
      });
    }
  };

  return (
    <Container>
      {sets.map((num) => (
        <Card key={num}>
          <P>{"Set " + (num + 1)}</P>
          <hr />
          <Button onClick={() => handleClick(num + 1, "list/")} secondary>
            List
          </Button>

          <Button primary onClick={() => handleClick(num + 1, "flashcards/")}>
            Flashcards
          </Button>
        </Card>
      ))}
    </Container>
  );
}

export default Grid;
