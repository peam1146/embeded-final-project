import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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

const getData=(db)=>{
  const dbRef = ref(db);
  return get(child(dbRef, 'data')).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val())
      return snapshot.val();
    }
    else {
      console.log("No data available")
    }
  }
  )

}
export {db,getData};

