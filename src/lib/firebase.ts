import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7QHdrczoGzDFO0-yvcopDxgzFkr87o_s",
    authDomain: "travel-nextjs-ad5e8.firebaseapp.com",
    projectId: "travel-nextjs-ad5e8",
    storageBucket: "travel-nextjs-ad5e8.appspot.com",
    messagingSenderId: "21013038583",
    appId: "1:21013038583:web:dbad396f49ad4cd29c9af2"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };