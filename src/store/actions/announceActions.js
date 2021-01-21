export const createAnnounce = (announce) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("announces")
      .add({
        ...announce,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_ANNOUNCE", announce: announce });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ANNOUNCE_ERROR", err });
      });
  };
};

export const deleteAnnounce = (announceId) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    console.log(announceId);
    firestore
      .collection("announces")
      .doc(announceId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_ANNOUNCE" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_ANNOUNCE_ERROR", err });
      });
  };
};

export const updateAnnounce = (announceId, payload) => {
  console.log(
    "we are inside updateAnnounce() before the return",
    announceId,
    payload
  );
  return (dispatch, getState, { getFirestore }) => {
    console.log("we are inside updateAnnounce() in the return");

    // make async call to database
    const firestore = getFirestore();
    console.log(announceId, "this is the ID");

    firestore
      .collection("announces")
      .doc(announceId)
      .update(payload)
      .then(() => {
        console.log("updateAnnounce() called");
        dispatch({ type: "UPDATE_ANNOUNCE" });
      })
      .catch((err) => {
        console.log("updateAnnounce() failed");

        dispatch({ type: "UPDATE_ANNOUNCE_ERROR", err });
      });
  };
};
