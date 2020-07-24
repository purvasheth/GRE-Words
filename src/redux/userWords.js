export function addUserWords(userWords) {
  return {
    type: "ADD_USER_WORDS",
    payload: userWords,
  };
}
export function addNewWords(userWords) {
  return {
    type: "ADD_NEW_WORDS",
    payload: userWords,
  };
}

export function correct(wordId) {
  return {
    type: "CORRECT",
    payload: wordId,
  };
}

export function wrong(wordId) {
  return {
    type: "WRONG",
    payload: wordId,
  };
}

export default function userWordsReducer(userWords = null, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_USER_WORDS":
      return payload;

    case "ADD_NEW_WORDS":
      return { ...userWords, ...payload };

    case "CORRECT":
      return guessCorrect(userWords, payload);

    case "WRONG":
      return guessWrong(userWords, payload);

    default:
      return userWords;
  }
}

function guessCorrect(state, wordId) {
  const groupId = Math.ceil(+wordId / 25);
  const group = "group" + groupId;
  const word = state[group].group[wordId];
  let { local, correct } = word;
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
    case "new":
      local = "mastered";
      break;
    case "mastered":
      break;
    default:
      return state;
  }
  const finalWord = { ...word, local, correct };
  return {
    ...state,
    [group]: {
      ...state[group],
      group: { ...state[group]["group"], [wordId]: finalWord },
    },
  };
}

function guessWrong(state, wordId) {
  const groupId = Math.ceil(+wordId / 25);
  const group = "group" + groupId;
  const word = state[group].group[wordId];
  let { local, correct, wrong } = word;
  correct = 0;
  wrong++;
  local = "learning";
  const finalWord = { ...word, local, correct, wrong };
  return {
    ...state,
    [group]: {
      ...state[group],
      group: { ...state[group]["group"], [wordId]: finalWord },
    },
  };
}
