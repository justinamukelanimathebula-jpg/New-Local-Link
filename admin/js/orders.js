// admin/js/orders.js
import { db } from './firebase.js';
import { doc, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

/**
 * Global Order State Manager
 * This handles the flow: Pending -> Accepted -> Preparing -> Ready -> PickedUp -> Delivered
 */
export async function updateOrderStatus(orderId, newStatus) {
    try {
        const orderRef = doc(db, "orders", orderId);
        
        // Update the order document
        await updateDoc(orderRef, {
            status: newStatus,
            updatedAt: serverTimestamp()
        });

        // Trigger notification via Cloud Functions (Backend)
        // This keeps the customer/vendor/driver in sync instantly
        console.log(`Order ${orderId} is now ${newStatus}`);
    } catch (error) {
        console.error("Critical error updating order:", error);
    }
}

