import React, { useState, useEffect, useReducer } from "react";
import { writeStore } from "./FirebaseFunctions";
import { reducer } from "./Reducer";
import {
  Button,
  ParentContainer,
  Container,
  FlashCard,
  ProgressContainer,
  Progress,
  Bar,
  Span,
  colors,
} from "./Components";

function FlashCards(props) {
  const { newWords, initialState } = props.location.state;
  const { green, yellow, darkred, darkgrey, darkblue } = colors;
  const user = JSON.parse(localStorage.getItem("authUser"));

  const [flip, setFlip] = useState(false);
  const [word, setWord] = useState("");
  const [wordId, setWordId] = useState("");
  const [info, setInfo] = useState([]);
  const [cat, setCat] = useState("");
  const [color, setColor] = useState(darkgrey);
  const [store, dispatch] = useReducer(reducer, initialState);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    randomChoice(newWords, store);

    return () => {
      writeStore(user.uid, store);
    };
  }, []);

  useEffect(() => {
    randomChoice(newWords, store);
  }, [store]);

  function randomChoice(arr) {
    const w = arr[Math.floor(arr.length * Math.random())];
    setWordId(w.wordId);
    setWord(w.word);
    setInfo(w.info);
    let newWord = store.filter((word) => word.hasOwnProperty(w.wordId))[0];
    const newCat = newWord[w.wordId]["local"];
    setCat(newCat);
    switch (newCat) {
      case "mastered":
        setColor(green);
        break;
      case "reviewing":
        setColor(yellow);
        break;
      case "learning":
        setColor(darkred);
        break;
      default:
        setColor(darkgrey);
        break;
    }
    const newCounts = {
      "new word": 0,
      learning: 0,
      mastered: 0,
      reviewing: 0,
    };
    store.forEach((word) => {
      const key = Object.keys(word)[0];
      newCounts[word[key]["local"]]++;
    });
    setCounts(newCounts);
  }
  const { mastered, learning, reviewing } = counts;

  return (
    <ParentContainer>
      <Container flip={flip}>
        <FlashCard front>
          <p style={{ color: darkblue }}>
            <b>{word} </b> <span style={{ color }}> ({cat}) </span>
          </p>
          <Button
            primary
            style={{ margin: "0px 0px 50px 0px" }}
            onClick={() => setFlip(true)}
          >
            Check Meaning
          </Button>
          <ProgressContainer>
            <Progress>
              <Bar w={learning * 4 + "%"} c={darkred} />
            </Progress>
            <Span>Learning : {learning} </Span>
          </ProgressContainer>

          <ProgressContainer>
            <Progress>
              <Bar w={reviewing * 4 + "%"} c={yellow} />
            </Progress>
            <Span>Reviewing : {reviewing} </Span>
          </ProgressContainer>

          <ProgressContainer>
            <Progress>
              <Bar w={mastered * 4 + "%"} c={green} />
            </Progress>
            <Span>Mastered : {mastered} </Span>
          </ProgressContainer>
        </FlashCard>
        <FlashCard>
          {info.map((m, i) => (
            <React.Fragment key={i}>
              <p style={{ color: darkblue }}>
                <b>{word} </b> <span style={{ color }}> ({cat}) </span>
              </p>
              <p>
                {m.type} {m.meaning}
              </p>
              <p style={{ color: darkblue }}>{m.sentence}</p>
            </React.Fragment>
          ))}
          <Button
            red
            onClick={() => {
              dispatch({ type: "wrong", payload: { wordId } });
              setFlip(false);
              // randomChoice(newWords);
            }}
          >
            Wrong
          </Button>
          <Button
            green
            onClick={() => {
              dispatch({ type: "correct", payload: { wordId } });
              setFlip(false);
              // randomChoice(newWords, store);
            }}
          >
            Right
          </Button>
        </FlashCard>
      </Container>
    </ParentContainer>
  );
}

export default FlashCards;
