import firebase from "firebase/app";
import "@firebase/messaging";
import "firebase/firestore";
import "firebase/auth";

//the config file to connect our application with  our database
export const firebaseConfig = {
  apiKey: "AIzaSyB4Wrc4Ic9ot5FjNxvFwUcEsdWNa5uHRB4",
  authDomain: "deadlines-e6c2b.firebaseapp.com",
  databaseURL: "https://deadlines-e6c2b.firebaseio.com",
  projectId: "deadlines-e6c2b",
  storageBucket: "deadlines-e6c2b.appspot.com",
  messagingSenderId: "806703338833",
  appId: "1:806703338833:web:a5f495c988b10431"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

const messaging = firebase.messaging();
// this is used for the firebase chat messaging services to work properly
if (firebase.messaging.isSupported()) {
  messaging.usePublicVapidKey(
    "BK4mYHWRPzkwPO8azeSnDNpB8DQyBpNYZU5nC7G7bhx_JbDwN5uZSk_I0wrgm-MelrJQ78eyp6BnzttjwVOQ4cA"
  );
}

messaging.requestPermission()
  .then(function(){
    return messaging.getToken();
  })
  .then(function(token){
  })
  .catch(function(error){
    console.log('error occured',error);
  })

export { messaging };

export default firebase;
