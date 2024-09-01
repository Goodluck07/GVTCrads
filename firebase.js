// firebase.js

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { isSupported as isAnalyticsSupported, getAnalytics } from 'firebase/analytics'


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVSUb1cWQpka_i1N4L3zR6jfm3_I36K58",
    authDomain: "flashcard-5d446.firebaseapp.com",
    projectId: "flashcard-5d446",
    storageBucket: "flashcard-5d446.appspot.com",
    messagingSenderId: "495630819941",
    appId: "1:495630819941:web:f300f8b3cf0bd60c24dc8c",
    measurementId: "G-843365DH99"
  };

const app = initializeApp(firebaseConfig)

// Initialize Firestore and Auth only if window is available
const db = typeof window !== 'undefined' ? getFirestore(app) : null
const auth = typeof window !== 'undefined' ? getAuth(app) : null

let analytics = null
if (typeof window !== 'undefined' && isAnalyticsSupported()) {
  analytics = getAnalytics(app)
}

export { db, auth, analytics }
