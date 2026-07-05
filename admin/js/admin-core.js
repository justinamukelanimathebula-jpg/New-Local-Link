// admin/js/admin-core.js
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../auth/login.html";
        return;
    }

    // Role-Based Access Control (RBAC)
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    // Check if user has 'admin' in their roles array
    if (!userData.roles || !userData.roles.includes('admin')) {
        alert("Access Denied: You are not an administrator.");
        window.location.href = "../customer/home.html";
    } else {
        console.log("Welcome, Administrator.");
        // Initialize dashboard charts and data here
    }
});

