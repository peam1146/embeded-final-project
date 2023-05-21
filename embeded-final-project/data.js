// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase ,ref, onValue} from "firebase/database";
// import {getFirestore,collection,getDocs} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAafMMDt569mI3kZvtHm4dJFNHeRprgAZs",
  authDomain: "embeded-final-project.firebaseapp.com",
  databaseURL: "https://embeded-final-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "embeded-final-project",
  storageBucket: "embeded-final-project.appspot.com",
  messagingSenderId: "233106376288",
  appId: "1:233106376288:web:a55eec386507a7d04fa505",
  measurementId: "G-9N90XMLCNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
// async function getData(db){
//   const citiesCol = collection(db, 'data');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
const ndb = getDatabase();
const starCountRef
console.log(ndb)