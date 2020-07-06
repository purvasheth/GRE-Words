export function reducer(state, action) {
  const { wordId } = action.payload;
  let newWord = state.filter((word) => word.hasOwnProperty(wordId))[0];
  switch (action.type) {
    case "correct":
      newWord[wordId]["correct"]++;
      switch (newWord[wordId]["local"]) {
        case "learning":
          newWord[wordId]["local"] = "reviewing";
          newWord[wordId]["correct"] = 0;
          break;
        case "reviewing":
          if (newWord[wordId]["correct"] === 3) {
            newWord[wordId]["local"] = "mastered";
            newWord[wordId]["correct"] = 0;
          }
          break;
        case "new word":
          newWord[wordId]["local"] = "mastered";
          break;
        default:
          console.log("mastered");
      }
      break;
    default:
      newWord[wordId]["wrong"]++;
      newWord[wordId]["correct"] = 0;
      newWord[wordId]["local"] = "learning";
  }
  return state.map((word) => (word.hasOwnProperty(wordId) ? newWord : word));
}
