// Ensure Firebase is initialized (This assumes you have your config in index.html or firebase.js)
const db = firebase.firestore();

// 1. PROTECTION: Check if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // If not logged in, force redirect to login page
        window.location.href = '../login.html';
    } else {
        // If logged in, fetch the dashboard data
        loadDashboardData(user.uid);
    }
});

// 2. LOGIC: Fetch and Display Data
async function loadDashboardData(uid) {
    try {
        // Fetch current vendor's orders (Replace 'orders' with your collection name)
        const ordersSnapshot = await db.collection('orders')
            .where('vendorId', '==', uid)
            .get();

        // Update the "Pending Orders" count
        const pendingCount = ordersSnapshot.size;
        document.getElementById('pendingOrders').innerText = pendingCount;

        // Simple math for "Today's Revenue" (Assuming you have a 'total' field)
        let totalRevenue = 0;
        ordersSnapshot.forEach(doc => {
            totalRevenue += doc.data().total || 0;
        });
        document.getElementById('todayRevenue').innerText = `$${totalRevenue.toFixed(2)}`;

        console.log("Dashboard loaded successfully!");
    } catch (error) {
        console.error("Error loading dashboard data: ", error);
        alert("Could not load dashboard data.");
    }
}

