import styled from "@emotion/styled";
export const Card = styled.div`
  position: absolute;
  align-items: center;
  margin: 20px;
  padding: 20px;
  width: inherit;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  backface-visibility: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
export const ProgressContainer = styled.div`
  direction: flex;
  flex-direction: column;
  justify-content: center;
  width: inherit;
`;
export const Span = styled.span`
  color: #505050;
  font-size: 0.8rem;
`;
export const Button = styled.button`
  background-color: ${(props) =>
    (props.primary && "#0391ce") ||
    (props.secondary && "#D3D3D3") ||
    (props.red && "#E50000") ||
    (props.green && "#308014")};
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
