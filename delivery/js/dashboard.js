// delivery/js/dashboard.js
import { db } from './firebase.js';
import { doc, updateDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const driverId = "driver_123";
const statusBtn = document.getElementById('toggleStatus');

let isOnline = false;

statusBtn.addEventListener('click', async () => {
    isOnline = !isOnline;
    
    // Update availability in Firestore
    await updateDoc(doc(db, "availability", driverId), {
        online: isOnline,
        lastUpdated: new Date()
    });

    statusBtn.innerText = isOnline ? "🟢 Online" : "🔴 Go Online";
    statusBtn.className = isOnline ? "btn-toggle online" : "btn-toggle offline";
});

// Real-time listener for incoming orders
onSnapshot(doc(db, "deliveryAssignments", driverId), (doc) => {
    if (doc.exists() && doc.data().status === "new_order") {
        alert("New Order Received! Check the Orders tab.");
        // Logic to trigger sound/notification
    }
});

