import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useSelector } from "react-redux";
import { fetchUserWords, writeUserWords } from "../FirebaseFunctions";

function Stats() {
  const words = useSelector((state) => state.words);
  const user = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    // fetchUserWords(user.uid,1);
    //fetchAllUserWords(user.uid);
    //   writeUserWords(user.uid, {
    //     id: "6KveLTjG11L9LaSLYVcJ",
    //     group: {
    //       1: {
    //         global: "new",
    //         local: "new",
    //       },
    //       2: {
    //         global: "new",
    //         local: "new",
    //       },
    //       3: {
    //         global: "new",
    //         local: "new",
    //       },
    //     },
    //   });
  });

  return (
    <React.Fragment>
      <Navigation select="stats" />
      <div>{JSON.stringify(words)}</div>
    </React.Fragment>
  );
}

export default Stats;
