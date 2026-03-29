import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAWg8LIK-PuWw-mvhFP1HqAVK6PpWxWfKs",
  authDomain: "mariomty.firebaseapp.com",
  projectId: "mariomty",
  storageBucket: "mariomty.firebasestorage.app",
  messagingSenderId: "156319276735",
  appId: "1:156319276735:web:c0a5591a5e464efc2b700a"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
