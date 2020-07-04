import React, { useState, useContext, useEffect, useReducer } from "react";
import { writeStore } from "./FirebaseFunctions";
import UserContext from "./UserContext";
import { reducer } from "./Reducer";
import {
  Button,
  ParentContainer,
  Container,
  Card,
  ProgressContainer,
  Progress,
  Bar,
  Span,
} from "./Components";

function FlashCard(props) {
  let { newWords, initialState } = props.location.state;

  const [flip, setFlip] = useState(false);
  const [user] = useContext(UserContext);
  const [word, setWord] = useState("");
  const [wordId, setWordId] = useState("");
  const [info, setInfo] = useState([]);
  const [cat, setCat] = useState("");
  const [color, setColor] = useState("#505050");
  const [store, dispatch] = useReducer(reducer, initialState);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    randomChoice(newWords, store);

    return () => {
      writeStore(user.uid, store);
    };
  }, [store]);

  function randomChoice(arr) {
    const w = arr[Math.floor(arr.length * Math.random())];
    //const w = arr[0];
    setWordId(w.wordId);
    setWord(w.word);
    setInfo(w.info);
    let newWord = store.filter((word) => word.hasOwnProperty(w.wordId))[0];
    setCat(newWord[w.wordId]["local"]);
    switch (newWord[w.wordId]["local"]) {
      case "mastered":
        setColor("green");
        break;
      case "reviewing":
        setColor("#F7AF06");
        break;
      case "learning":
        setColor("red");
        break;
      default:
        setColor("#505050");
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

  return (
    <ParentContainer>
      <Container flip={flip}>
        <Card front>
          <p style={{ color: "#072F5F" }}>
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
              <Bar w={counts["learning"] * 4 + "%"} c="red" />
            </Progress>
            <Span>Learning : {counts["learning"]} </Span>
          </ProgressContainer>

          <ProgressContainer>
            <Progress>
              <Bar w={counts["reviewing"] * 4 + "%"} c="#F7AF06" />
            </Progress>
            <Span>Reviewing : {counts["reviewing"]} </Span>
          </ProgressContainer>

          <ProgressContainer>
            <Progress>
              <Bar w={counts["mastered"] * 4 + "%"} c="green" />
            </Progress>
            <Span>Mastered : {counts["mastered"]} </Span>
          </ProgressContainer>
        </Card>
        <Card>
          {info.map((m, i) => (
            <React.Fragment key={i}>
              <p style={{ color: "#072F5F" }}>
                <b>{word} </b> <span style={{ color }}> ({cat}) </span>
              </p>
              <p>
                {m.type} {m.meaning}
              </p>
              <p style={{ color: "#072F5F" }}>{m.sentence}</p>
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
        </Card>
      </Container>
    </ParentContainer>
  );
}

export default FlashCard;
