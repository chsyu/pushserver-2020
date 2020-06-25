$(document).ready(function () {
  // INITIALIZE FIREBASE
  firebase.initializeApp({
    apiKey: "AIzaSyDUH6vOCALEXSjYHgv8P9d2y3tKklE44qA",
    authDomain: "f2e2020-bd468.firebaseapp.com",
    databaseURL: "https://f2e2020-bd468.firebaseio.com",
    projectId: "f2e2020-bd468",
    storageBucket: "f2e2020-bd468.appspot.com",
    messagingSenderId: "832044128799",
    appId: "1:832044128799:web:5dedad46efcd2c3253932a",
  });

  // REFERENCE PUSHSERVER
  let docRef = firebase.firestore().collection("pushserver").doc("pushinfo");
  // REFERENCE PUSH MESSAGES
  let messagesRef = docRef.collection("messages");
  // REFERENCE CLIENT ID
  let clientsRef = docRef.collection("clients");

  // REGISTER DOM ELEMENTS
  const $messageField = $("#message-field");
  // EXPO PUSH SERVER
  const EXPO_PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
  const NTUE_PUSH_ENDPOINT = "https://ntuepushserver.herokuapp.com/tokens";

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let message = $messageField.val();
      //SAVE MESSAGE
      messagesRef.add({
        message: message,
        timeStamp: Date.now(),
      });

      // EMPTY INPUT FIELD
      $messageField.val("");

      // REALTIME DATABASE REF
      let dbTokenid = firebase.database().ref(`/clientstoken}`);
      let dbTest = firebase.database().ref('/Test');
      // dbTest.set({ "Test": "Test" });
      // return dbTest.once("value").then(test=>{
      //   alert("dbTest return");
      //   alert(test.val().Test);
      // });
      // dbTokenid.once("value").then(snapshot => {
      //   alert("got dbTokenid");
      //   alert(snapshot.val().token);
      // });

      // firebase
      //   .database()
      //   .ref("/users/" + userId)
      //   .once("value")
      //   .then(function (snapshot) {
      //     var username =
      //       (snapshot.val() && snapshot.val().username) || "Anonymous";
      //     // ...
      //   });

      // SEND A PUSH NOTIFICATION
      // let pushMessages = [];
      dbTokenid.once("value").then((snapshot) => {
        // alert(snapshot.val().token);
        const pushMessage = {
          to: snapshot.val().token,
          sound: "default",
          title: "Original Title",
          body: "And here is the body!",
          data: { text: message },
          _displayInForeground: true,
        };

        const messagentue = {
          token: snapshot.val().token,
          message: message,
        };

        try {
          console.log(pushMessage);
          axios.post(EXPO_PUSH_ENDPOINT, pushMessage);
          // alert(messagentue.token);
          alert(messagentue.message);
          axios.post(NTUE_PUSH_ENDPOINT, messagentue);
        } catch (e) {
          console.log(e);
        }
      });
      // snapshot.docs.map(doc => {

      // });


    }
  });
});
