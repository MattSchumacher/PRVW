import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBzR_UTmXT8xt5kIn4UC6SugZT-mZV7K2M",
  authDomain: "matt-rivia-38ea4.firebaseapp.com",
  databaseURL: "https://matt-rivia-38ea4.firebaseio.com/",
  projectId: "matt-rivia-38ea4",
  storageBucket: "matt-rivia-38ea4.appspot.com",
  messagingSenderId: "200252470964",
  appId: "1:200252470964:web:451ef1d8d4da7129e689e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;