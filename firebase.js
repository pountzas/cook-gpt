// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUBnVBML2ymkH4Xuh-ioLGIMASlEqc2d4",
  authDomain: "cookgpt-f2052.firebaseapp.com",
  projectId: "cookgpt-f2052",
  storageBucket: "cookgpt-f2052.appspot.com",
  messagingSenderId: "587874654519",
  appId: "1:587874654519:web:95f66ec81fd5b6d938a2b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
