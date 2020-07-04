import React from "react";
import styled from "@emotion/styled";

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function List(props) {
  const { newWords } = props.location.state;

  return (
    <React.Fragment>
      {newWords.map((w) => (
        <Card key={w.wordId}>
          <p
            style={{
              textAlign: "center",
              width: "100%",
              color: "#072F5F",
              fontSize: "1.05rem",
            }}
          >
            <b>{w.word}</b>
          </p>
          <React.Fragment>
            {w.info.map((m, i) => (
              <React.Fragment key={i}>
                <p>
                  {m.type} {m.meaning}
                </p>
                <p style={{ color: "#072F5F" }}>{m.sentence}</p>
              </React.Fragment>
            ))}
          </React.Fragment>
        </Card>
      ))}
    </React.Fragment>
  );
}

export default List;
