import React, { useState, useEffect } from "react";
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
} from "../Components";
import Navigation from "../Navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { correct, wrong } from "../redux/userWords";
import { writeUserWords } from "../FirebaseFunctions";

function FlashCards(props) {
  const { newWords } = props.location.state;
  const { green, yellow, darkred, darkgrey, darkblue } = colors;
  const user = JSON.parse(localStorage.getItem("authUser"));

  const [flip, setFlip] = useState(false);
  const [wordId, setWordId] = useState(0);
  const [word, setWord] = useState("");
  const [info, setInfo] = useState([]);
  const [cat, setCat] = useState("");
  const [color, setColor] = useState(darkgrey);
  const [counts, setCounts] = useState({});
  const { num } = useParams();
  const max = num * 25;
  const min = (num - 1) * 25 + 1;
  const dispatch = useDispatch();
  const writeWords = useSelector((state) => state.userWords["group" + num]);
  const userWords = writeWords.group;

  useEffect(() => {
    randomChoice(userWords);

    return () => {
      writeUserWords(user.uid, writeWords);
    };
  }, []);
  useEffect(() => {
    randomChoice(userWords);
  }, [userWords]);

  function randomChoice(userWords) {
    const randIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const word = newWords[randIndex - min];
    const userWord = userWords[randIndex];

    setWordId(randIndex);
    setWord(word.word);
    setInfo(word.info);
    setCat(userWord.local);
    switch (userWord.local) {
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
    let learning = 0,
      mastered = 0,
      reviewing = 0;
    for (const key in userWords) {
      switch (userWords[key].local) {
        case "mastered":
          mastered++;
          break;
        case "reviewing":
          reviewing++;
          break;
        case "learning":
          learning++;
          break;
        default:
          break;
      }
      setCounts({ mastered, learning, reviewing });
    }
  }
  const { mastered, learning, reviewing } = counts;
  return (
    <React.Fragment>
      <Navigation select="none" />
      <ParentContainer>
        <Container flip={flip}>
          <FlashCard front>
            <p style={{ color: darkblue }}>
              <b>{word} </b> <span style={{ color }}> ({cat}) </span>
            </p>
            <Button
              primary
              style={{ marginBottom: "50px" }}
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
            {info.map((data) => (
              <React.Fragment key={data.meaning}>
                <p style={{ color: darkblue }}>
                  <b>{word} </b> <span style={{ color }}> ({cat}) </span>
                </p>
                <p>
                  {data.type} {data.meaning}
                </p>
                <p style={{ color: darkblue }}>{data.sentence}</p>
              </React.Fragment>
            ))}
            <Button
              red
              onClick={() => {
                dispatch(wrong(wordId));
                setFlip(false);
              }}
            >
              Wrong
            </Button>
            <Button
              green
              onClick={() => {
                dispatch(correct(wordId));
                setFlip(false);
              }}
            >
              Right
            </Button>
          </FlashCard>
        </Container>
      </ParentContainer>
    </React.Fragment>
  );
}

export default FlashCards;
