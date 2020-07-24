import React from "react";
import { ListCard, WordHeading, colors } from "../Components";
import Navigation from "../Navigation/Navigation";

function List(props) {
  const { newWords } = props.location.state;

  return (
    <React.Fragment>
      <Navigation select="none" />
      {newWords.map((newWord) => (
        <ListCard key={newWord.wordId}>
          <WordHeading>
            <b>{newWord.word}</b>
          </WordHeading>
          <React.Fragment>
            {newWord.info.map((data) => (
              <React.Fragment key={data.meaning}>
                <p style={{ width: "100%" }}>
                  {data.type} {data.meaning}
                </p>
                <p style={{ color: colors.darkblue }}>{data.sentence}</p>
              </React.Fragment>
            ))}
          </React.Fragment>
        </ListCard>
      ))}
    </React.Fragment>
  );
}

export default List;
