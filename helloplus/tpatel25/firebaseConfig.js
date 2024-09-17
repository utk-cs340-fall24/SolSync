// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXBfKrOMqrJzDHzMhqQlLv6M3FjFdGQho",
  authDomain: "solsync-340.firebaseapp.com",
  projectId: "solsync-340",
  storageBucket: "solsync-340.appspot.com",
  messagingSenderId: "397355492378",
  appId: "1:397355492378:web:4ca7dc243a57a0f9529da3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)