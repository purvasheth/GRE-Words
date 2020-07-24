import { firestore } from "./firebase";

export const createUserDocument = async (user) => {
  // If there is no user, let's not do this.
  if (!user) return;

  // Get a reference to the location in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch a document from that location.
  const snapshot = await userRef.get();

  // If there isn't a document for that user. Let's use information
  // that we got from either Google or our sign up form.

  if (!snapshot.exists) {
    const { displayName, email } = user;
    try {
      await userRef.set({
        displayName,
        email,
      });
    } catch (error) {
      console.error("Error creating user", console.error);
    }
  }
};

export const fetchWords = async (num) => {
  const start = (num - 1) * 25;
  const end = num * 25 + 1;

  const snapshot = await firestore
    .collection("words")
    .where("id", ">", start)
    .where("id", "<", end)
    .get();
  return snapshot.docs.map((doc) => ({ wordId: doc.id, ...doc.data() }));
};

export const fetchStore = async (userId, num, words) => {
  const ref = firestore.doc(`users/${userId}`);
  const snapshot = await ref.doc(`${words[0].wordId}`).get();

  if (!snapshot.exists) {
    const userWords = [];
    const batch = firestore.batch();
    words.forEach((word) => {
      const global = "new word";
      const local = "new word";
      const correct = 0;
      const wrong = 0;
      const id = word.id;

      batch.set(ref.doc(`${word.wordId}`), {
        global,
        local,
        correct,
        wrong,
        id,
      });
      userWords.push({
        global,
        local,
        correct,
        wrong,
        id,
      });
    });
    batch.commit();
    return userWords;
  }

  return null;

  // const newsnapshot = await firestore
  //   .doc(`users/${userId}`)
  //   .collection("words")
  //   .where("id", ">", start)
  //   .where("id", "<", end)
  //   .get();

  // return newsnapshot.docs.map((doc) => ({ wordId: doc.id, ...doc.data() }));
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection("users").doc(uid).get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const writeStore = (userId, store) => {
  const batch = firestore.batch();
  const ref = firestore.doc(`users/${userId}`).collection("words");
  store.forEach((word) => {
    const { wordId, id, wrong, correct, local, global } = word;
    batch.set(ref.doc(`${wordId}`), { id, wrong, correct, local, global });
  });
  batch.commit();
};

export const fetchAllWords = async () => {
  const snapshot = await firestore.collection("words").get();
  return snapshot.docs.map((doc) => ({ wordId: doc.id, ...doc.data() }));
};

export const fetchAllUserWords = async (userId) => {
  const ref = firestore.doc(`users/${userId}`).collection("words");
  const snapshot = await ref.get();
  const userWords = {};
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    userWords["group" + data.groupId] = { id, group: data.group };
  });
  return userWords;
};
export const fetchAllNewWords = async () => {
  const doc = await firestore.doc("new-words/JQebIXn4X9xnV3XxSBgq").get();
  return doc.data();
};

export const fetchUserWords = async (userId, num) => {
  const start = (num - 1) * 25;
  const end = num * 25 + 1;

  const ref = firestore.doc(`users/${userId}`);
  const snapshot = await ref
    .collection("words")
    .where("groupId", "==", num)
    .get();

  if (snapshot.docs.length === 0) {
    console.log("write needed");
    const obj = {};
    for (let i = start + 1; i < end; i++) {
      const correct = 0;
      const wrong = 0;
      const local = "new";
      const global = "new";
      obj[i] = { global, local, correct, wrong };
    }
    const path = await ref.collection("words").add({
      groupId: num,
      group: obj,
    });
    const id = path.path.split("/").pop();
    return { id, group: obj };
  }
  return null;
};

export const writeUserWords = (userId, userWords) => {
  firestore
    .doc(`users/${userId}/words/${userWords.id}`)
    .update({ group: userWords.group })
    .catch((err) => console.log(err));
};
