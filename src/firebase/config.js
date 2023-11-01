import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyD_rpUOPCcf4zqXYAR2-XHf17uy-MR9znE",
    authDomain: "tip-iii-2.firebaseapp.com",
    projectId: "tip-iii-2",
    storageBucket: "tip-iii-2.appspot.com",
    messagingSenderId: "310045260520",
    appId: "1:310045260520:web:b73032d742d4659527e75d"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();