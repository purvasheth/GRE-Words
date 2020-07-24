import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import {
  fetchAllNewWords,
  fetchAllUserWords,
  fetchUserWords,
} from "../FirebaseFunctions";
import { HomeContainer, HomeCard, Button } from "../Components";
import "./../App.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { addWords } from "../redux/words";
import { addUserWords, addNewWords } from "../redux/userWords";

const P = styled.p`
  margin: 10px 0px 40px 0px;
  width: 200px;
  height: 0px;
  text-align: center;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: #072f5f;
`;

function SetName({ num }) {
  if (num < 12) {
    return <P> Common {num + 1}</P>;
  } else if (num < 26) {
    return <P>Basic {num + 1 - 12}</P>;
  } else {
    return <P>Advance {num + 1 - 26}</P>;
  }
}

function Home() {
  const sets = Array.from(Array(40).keys());
  const user = JSON.parse(localStorage.getItem("authUser"));
  const history = useHistory();
  const words = useSelector((state) => state.words);
  const userWords = useSelector((state) => state.userWords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!words) {
      fetchAllNewWords().then((newWords) => {
        dispatch(addWords(newWords));
      });
    }
    if (!userWords) {
      fetchAllUserWords(user.uid).then((newWords) => {
        dispatch(addUserWords(newWords));
      });
    }
  }, []);

  const getSet = (num) => {
    const start = (num - 1) * 25;
    const end = num * 25 + 1;
    const wordSet = [];
    for (let i = start + 1; i < end; i++) {
      wordSet.push({ id: i, ...words[i + ""] });
    }
    return wordSet;
  };

  const handleClick = async (num, path) => {
    const newWords = getSet(num);

    if (path.includes("list")) {
      history.push({
        pathname: path,
        state: { newWords },
      });
    } else {
      //check redux
      if (!userWords.hasOwnProperty("group" + num)) {
        let group = await fetchUserWords(user.uid, num);
        dispatch(addNewWords({ ["group" + num]: group }));
      }

      history.push({
        pathname: path,
        state: { newWords },
      });
    }
  };

  return words && userWords ? (
    <HomeContainer>
      <Navigation select="home" />
      {sets.map((num) => (
        <HomeCard key={num + ""}>
          <SetName num={num} />
          <Button onClick={() => handleClick(num + 1, "list/")} secondary>
            List
          </Button>
          <Button
            primary
            onClick={() => handleClick(num + 1, "flashcards/" + (num + 1))}
          >
            Flashcards
          </Button>
        </HomeCard>
      ))}
    </HomeContainer>
  ) : null;
}

export default Home;
