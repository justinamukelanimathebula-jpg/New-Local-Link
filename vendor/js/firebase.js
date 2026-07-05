// vendor/js/firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDbOi2aD5eFsiUi6mfFTS-wOj-jWbi5-9M",
    authDomain: "local-link-mm.firebaseapp.com",
    projectId: "local-link-mm",
    storageBucket: "local-link-mm.firebasestorage.app",
    messagingSenderId: "945184893851",
    appId: "1:945184893851:web:c84bf0bc2db2d2c81a4f3e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

