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

  // Get the document and return it, since that's what we're
  // likely to want to do next.
  //return getUserDocument(user.uid);
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
  const start = (num - 1) * 25;
  const end = num * 25 + 1;

  const ref = firestore.doc(`users/${userId}`).collection("words");
  const snapshot = await ref.doc(`${words[0].wordId}`).get();

  if (!snapshot.exists) {
    const batch = firestore.batch();
    words.forEach((word) => {
      const obj = {
        global: "",
        local: "new word",
        correct: 0,
        wrong: 0,
        id: word.id,
      };
      batch.set(ref.doc(`${word.wordId}`), obj);
    });
    batch.commit();
  }

  const newsnapshot = await firestore
    .doc(`users/${userId}`)
    .collection("words")
    .where("id", ">", start)
    .where("id", "<", end)
    .get();

  return newsnapshot.docs.map((doc) => ({ [doc.id]: { ...doc.data() } }));
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
  store.forEach((word) => {
    const key = Object.keys(word)[0];
    firestore.doc(`users/${userId}/words/${key}`).set(word[key]);
  });
};
