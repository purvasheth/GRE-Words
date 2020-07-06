import React from "react";
import { ListCard, WordHeading, colors } from "./Components";

function List(props) {
  const { newWords } = props.location.state;

  return (
    <React.Fragment>
      {newWords.map((w) => (
        <ListCard key={w.wordId}>
          <WordHeading>
            <b>{w.word}</b>
          </WordHeading>
          <React.Fragment>
            {w.info.map((m, i) => (
              <React.Fragment key={i}>
                <p>
                  {m.type} {m.meaning}
                </p>
                <p style={{ color: colors.darkblue }}>{m.sentence}</p>
              </React.Fragment>
            ))}
          </React.Fragment>
        </ListCard>
      ))}
    </React.Fragment>
  );
}

export default List;
