import styled from "@emotion/styled";

export const colors = {
  darkred: "#E50000",
  green: "#308014",
  blue: "#0391ce",
  darkblue: "#072F5F",
  darkgrey: "#505050",
  grey: "#D3D3D3",
  yellow: "#F7AF06",
};

export const ColumnCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
`;

export const RowCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
`;

export const FlashCard = styled(ColumnCard)`
  position: absolute;
  align-items: center;
  margin: 20px;
  padding: 20px;
  width: inherit;
  backface-visibility: hidden;
  transform: ${(props) => (props.front ? "rotateY(0deg)" : "rotateY(180deg)")};
`;
export const Container = styled.div`
  position: relative;
  width: 250px;
  display: flex;
  justify-content: center;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.flip ? "rotateY(180deg)" : "rotateY(0deg)")};
`;
export const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Progress = styled.div`
  position: relative;
  margin: 10px 0px 0px 0px;
  background-color: lightgrey;
`;
export const Bar = styled.div`
  background-color: ${(props) => props.c};
  width: ${(props) => props.w};
  height: 12px;
`;
export const ProgressContainer = styled(ColumnCard)`
  box-shadow: none;
  justify-content: center;
  width: inherit;
`;
export const Span = styled.span`
  color: ${colors.darkgrey};
  font-size: 0.8rem;
`;
export const Button = styled.button`
  background-color: ${(props) =>
    (props.primary && colors.blue) ||
    (props.secondary && colors.grey) ||
    (props.red && colors.darkred) ||
    (props.green && colors.green)};
  border: none;
  color: ${(props) => (props.secondary ? "black" : "white")};
  margin: 5px;
  font-size: 1.05rem;
  width: 200px;
  padding: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
export const HomeContainer = styled(RowCard)`
  box-shadow: none;
`;
export const HomeCard = styled(ColumnCard)`
  margin: 20px;
  padding: 20px;
  width: 210px;
`;

export const ListCard = styled(RowCard)`
  margin: 10px;
  padding: 0px 15px;
`;

export const WordHeading = styled.p`
  text-align: center;
  width: 100%;
  color: ${colors.darkblue};
  font-size: 1.05rem;
  font-weight: bold;
`;
