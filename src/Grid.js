import React, { useContext } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { fetchWords, fetchStore } from "./FirebaseFunctions";
import { HomeContainer, HomeCard, Button } from "./Components";
import "./App.css";

const P = styled.p`
  margin: 10px 0px 40px 0px;
  width: 200px;
  height: 0px;
  text-align: center;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: #072f5f;
`;

function Grid() {
  const sets = Array.from(Array(40).keys());
  const user = JSON.parse(localStorage.getItem("authUser"));
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
    <HomeContainer>
      {sets.map((num) => (
        <HomeCard key={num}>
          <P>
            {num < 12
              ? "Common " + (num + 1)
              : num < 26
              ? "Basic " + (num + 1 - 12)
              : "Advance " + (num + 1 - 26)}
          </P>
          <hr />
          <Button onClick={() => handleClick(num + 1, "list/")} secondary>
            List
          </Button>

          <Button primary onClick={() => handleClick(num + 1, "flashcards/")}>
            Flashcards
          </Button>
        </HomeCard>
      ))}
    </HomeContainer>
  );
}

export default Grid;
