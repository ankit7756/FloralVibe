document.addEventListener('DOMContentLoaded', async function () {
    // Fetch orders from API
    try {
        const userId = 1; // Mock userId
        const response = await fetch(`http://localhost:4000/api/orders?userId=${userId}`);
        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }

    // Function to display orders
    function displayOrders(orders) {
        const orderItemsContainer = document.getElementById('order-items');
        orderItemsContainer.innerHTML = '';

        if (!orders || orders.length === 0) {
            orderItemsContainer.innerHTML = '<p class="no-orders">No orders found</p>';
            return;
        }

        // Reverse the orders array to show newest first
        orders.reverse().forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.id = `order-item-${order.id}`;

            let receiveAction = '';
            if (order.status === 'Pending') {
                receiveAction = `
                    <button class="btn received-btn" data-id="${order.id}"><i class="fas fa-check"></i> Mark as Received</button>
                `;
            } else if (order.status === 'Received') {
                receiveAction = `
                    <span class="received-confirmation">Received! <i class="fas fa-check-circle"></i></span>
                `;
            }

            let reviewAction = `
                <a href="${order.reviewed ? '#' : '../pages/review.html?productId=' + order.productId}" class="btn review-btn" ${order.reviewed ? 'style="pointer-events: none; opacity: 0.6;"' : ''}>${order.reviewed ? 'Reviewed!' : 'Review'}</a>
            `;

            orderItem.innerHTML = `
                <div class="item-image" style="background-image: url('${order.Product.image}');"></div>
                <div class="item-details">
                    <h3 id="order-name-${order.id}">${order.Product.name}</h3>
                    <p class="order-date" id="order-date-${order.id}">Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p class="order-price" id="order-price-${order.id}">रु. ${parseFloat(order.Product.price).toFixed(2)}</p>
                    <p class="order-status" id="order-status-${order.id}">Status: ${order.status}</p>
                </div>
                <div class="item-actions">
                    ${receiveAction}
                    ${reviewAction}
                </div>
            `;

            orderItemsContainer.appendChild(orderItem);
        });

        // Setup event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
        // Received button listener
        document.querySelectorAll('.received-btn').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const orderId = this.getAttribute('data-id');

                try {
                    const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: 'Received' })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                        // Refresh the page to update the status and display
                        window.location.reload();
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error updating order status:', error);
                    alert('Failed to update order status');
                }
            });
        });

        // Mobile menu button
        document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
            document.querySelector('.nav-center').classList.toggle('nav-active');
            document.querySelector('.icon-buttons').classList.toggle('nav-active');
            this.classList.toggle('open');
        });

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', function (event) {
            event.preventDefault();
            const userConfirmed = confirm("Are you sure you want to log out?");
            if (userConfirmed) {
                window.location.href = "../pages/HomePage.html";
            } else {
                return;
            }
        });
    }
});