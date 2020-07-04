import firebase, { auth } from "./firebase";
import * as firebaseui from "firebaseui";

const uiConfig = {
  signInSuccessUrl: "/home",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const startFirebaseUI = function (elementId) {
  const ui = new firebaseui.auth.AuthUI(auth);
  ui.start(elementId, uiConfig);
};
