// customer/js/profile.js
import { db } from './firebase.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

// Hardcoded user ID for structural setup. (Replace with Firebase Auth UID later)
const customerId = "customer_user_999"; 
const customerRef = doc(db, "customers", customerId);

const usernameInput = document.getElementById('username');
const nameWarning = document.getElementById('usernameWarning');
const saveBtn = document.getElementById('saveProfileBtn');
const displayName = document.getElementById('displayName');

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000; 

async function loadProfile() {
    const docSnap = await getDoc(customerRef);
    
    if (docSnap.exists()) {
        const data = docSnap.data();
        usernameInput.value = data.username || "";
        document.getElementById('fullName').value = data.fullName || "";
        document.getElementById('phone').value = data.phone || "";
        displayName.innerText = data.fullName || "Customer";
        
        // 90-Day Username Change Validation
        if (data.lastUsernameChange) {
            const timeSinceLastChange = Date.now() - data.lastUsernameChange;
            if (timeSinceLastChange < NINETY_DAYS_MS) {
                const daysLeft = Math.ceil((NINETY_DAYS_MS - timeSinceLastChange) / (1000 * 60 * 60 * 24));
                usernameInput.disabled = true;
                nameWarning.innerText = `Username locked. Available to change in ${daysLeft} days.`;
                nameWarning.style.display = "block";
            } else {
                nameWarning.style.display = "none";
                usernameInput.disabled = false;
            }
        }
    }
}

saveBtn.addEventListener('click', async () => {
    saveBtn.innerText = "Saving...";
    
    const newUsername = usernameInput.value;
    const currentDoc = await getDoc(customerRef);
    
    let updateData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        updatedAt: serverTimestamp()
    };

    // Only update username and reset the timer if it actually changed
    if (currentDoc.exists() && currentDoc.data().username !== newUsername) {
        updateData.username = newUsername;
        updateData.lastUsernameChange = Date.now(); 
    } else if (!currentDoc.exists()) {
        updateData.username = newUsername;
        updateData.lastUsernameChange = Date.now(); 
    }

    await setDoc(customerRef, updateData, { merge: true });
    
    saveBtn.innerText = "Save Changes";
    alert("Profile updated successfully!");
    loadProfile(); 
});

// Initialize
loadProfile();

