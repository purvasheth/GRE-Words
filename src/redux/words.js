export function addWords(words) {
  return {
    type: "ADD_WORDS",
    payload: words,
  };
}

export default function wordsReducer(words = null, action) {
  switch (action.type) {
    case "ADD_WORDS":
      return action.payload;

    default:
      return words;
  }
}
