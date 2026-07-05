// auth/js/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// REGISTER HANDLER
export async function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save Unified User Document
    await setDoc(doc(db, "users", uid), {
        uid: uid,
        name: name,
        email: email,
        roles: [role], // Stored as array for future-proofing
        primaryRole: role, 
        createdAt: new Date().toISOString()
    });

    handleRouting(role);
}

// ROUTING ENGINE (The "Brain")
export async function handleRouting(role) {
    switch (role) {
        case "customer":
            window.location.href = "/customer/home.html";
            break;
        case "vendor":
            window.location.href = "/vendor/dashboard.html";
            break;
        case "driver":
        case "walker":
            window.location.href = "/delivery/dashboard.html";
            break;
        default:
            alert("Role not recognized.");
    }
}

// LOGIN HANDLER (Unified)
export async function loginUser(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", cred.user.uid));
    
    if (userDoc.exists()) {
        const userData = userDoc.data();
        // Send to primary dashboard
        handleRouting(userData.primaryRole);
    }
}

