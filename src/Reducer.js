export function reducer(state, action) {
  const { wordId } = action.payload;
  const newWord = state.filter((word) => word.hasOwnProperty(wordId))[0];
  let { local, global, correct, wrong } = newWord[wordId];
  switch (action.type) {
    case "correct":
      correct++;
      switch (local) {
        case "learning":
          local = "reviewing";
          correct = 0;
          break;
        case "reviewing":
          if (correct === 3) {
            local = "mastered";
            correct = 0;
          }
          break;
        case "new word":
          local = "mastered";
          break;
        default:
          console.log("mastered");
      }
      break;
    default:
      wrong++;
      correct = 0;
      local = "learning";
  }
  const finalWord = { [wordId]: { local, global, correct, wrong } };
  return state.map((word) => (word.hasOwnProperty(wordId) ? finalWord : word));
}
