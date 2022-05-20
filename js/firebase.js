import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdqkZzZhzY3DMJTRAvvet3oUtJNU1rwac",
  authDomain: "dht11-ac249.firebaseapp.com",
  databaseURL: "https://dht11-ac249-default-rtdb.firebaseio.com",
  projectId: "dht11-ac249",
  storageBucket: "dht11-ac249.appspot.com",
  messagingSenderId: "919377100924",
  appId: "1:919377100924:web:147708fb8acff5fc3209f9",
  measurementId: "G-XFHMMKFT8E",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
