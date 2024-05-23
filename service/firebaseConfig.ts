import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5A427Io_rwgx_NeGDmq1L92X9vVd89Hw",
  authDomain: "catmood-1ae1a.firebaseapp.com",
  projectId: "catmood-1ae1a",
  storageBucket: "catmood-1ae1a.appspot.com",
  messagingSenderId: "805308278836",
  appId: "1:805308278836:web:547975b50233b11ea08261"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};