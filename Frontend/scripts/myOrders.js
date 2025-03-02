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

            let reviewAction = `
                <div class="item-actions">
                    <a href="../pages/review.html?productId=${order.productId}" class="btn review-btn">Review</a>
                </div>
            `;
            if (order.reviewed) {
                reviewAction = `
                    <div class="item-actions">
                        <span class="reviewed-text">Reviewed!</span>
                    </div>
                `;
            }

            orderItem.innerHTML = `
                <div class="item-image" style="background-image: url('${order.Product.image}');"></div>
                <div class="item-details">
                    <h3 id="order-name-${order.id}">${order.Product.name}</h3>
                    <p class="order-date" id="order-date-${order.id}">Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p class="order-price" id="order-price-${order.id}">रु. ${parseFloat(order.Product.price).toFixed(2)}</p>
                    <p class="order-status" id="order-status-${order.id}">Status: ${order.status}</p>
                </div>
                ${reviewAction}
            `;

            orderItemsContainer.appendChild(orderItem);
        });

        // Setup event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
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