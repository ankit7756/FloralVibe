document.addEventListener('DOMContentLoaded', async function () {
    // Fetch dashboard stats
    try {
        const response = await fetch('http://localhost:4000/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const stats = await response.json();
        displayStats(stats);
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }

    // Display stats
    function displayStats(stats) {
        document.getElementById('total-sales').textContent = `रु. ${stats.totalSales || '0.00'}`;
        document.getElementById('total-orders').textContent = stats.totalOrders || '0';
        document.getElementById('active-users').textContent = stats.activeUsers || '0';
        document.getElementById('total-products').textContent = stats.totalProducts || '0';
    }
});