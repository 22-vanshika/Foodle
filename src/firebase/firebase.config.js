import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
  // apiKey:  import.meta.env.VITE_APIKEY,
  // authDomain: import.meta.env.VITE_AUTHDOMAIN ,
  // projectId:  import.meta.env.VITE_PROJECTID,
  // storageBucket:  import.meta.env.VITE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_APPID ,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAeGx435_T-3QlmiGLG9PoJ5IbHi_cWa84",
  authDomain: "restro-40c98.firebaseapp.com",
  projectId: "restro-40c98",
  storageBucket: "restro-40c98.appspot.com",
  messagingSenderId: "899146375929",
  appId: "1:899146375929:web:59ccc17ea57550ee4bb828",
  measurementId: "G-7J1G0X2P59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app)