import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
// ייצוא האות' שנשתמש בו בקומפוננטת הלוגין
export const auth = getAuth(app);