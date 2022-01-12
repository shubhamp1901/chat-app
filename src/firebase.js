import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC0cuVyZk-L9DiZx80894OwRvgZ4pPYs4I",
  authDomain: "messenger-4a723.firebaseapp.com",
  projectId: "messenger-4a723",
  storageBucket: "messenger-4a723.appspot.com",
  messagingSenderId: "13386275959",
  appId: "1:13386275959:web:a7dd926b04dc7f4018ba72"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;