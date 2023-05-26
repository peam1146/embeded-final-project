import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get ,set } from "firebase/database";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

function writeUserData(state) {
  const db = getDatabase();
  set(ref(db, "state"), state);
}

async function readUserData() {
  const dbRef = ref(db);
  return get(child(dbRef, 'state')).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val())
      return snapshot.val();
    }
    else {
      console.log("No data available");
    }
  }
  )
}

const getData=(db)=>{
  const dbRef = ref(db);
  return get(child(dbRef, 'data')).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val())
      return snapshot.val();
    }
    else {
      console.log("No data available");
    }
  }
  )

}
export {db,getData,writeUserData,readUserData};

