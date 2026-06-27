// Firebase Initialization Module
// Reads config from environment or config file

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Load configuration from environment or config file
let firebaseConfig;

try {
  // Try to load from config file (for development)
  const configModule = await import('../config/firebase.config.js');
  firebaseConfig = configModule.default;
} catch (e) {
  // Fallback: Use environment variables (for production)
  firebaseConfig = {
    apiKey: window.ENV?.FIREBASE_API_KEY || '',
    authDomain: window.ENV?.FIREBASE_AUTH_DOMAIN || '',
    projectId: window.ENV?.FIREBASE_PROJECT_ID || '',
    storageBucket: window.ENV?.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: window.ENV?.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: window.ENV?.FIREBASE_APP_ID || ''
  };
}

// Validate configuration
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY_HERE') {
  console.error('Firebase configuration is missing. Please set up your config/firebase.config.js file.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
