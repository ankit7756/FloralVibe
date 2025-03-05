let products = [];

document.addEventListener('DOMContentLoaded', async function () {
    // Fetch dashboard stats
    try {
        const statsResponse = await fetch('http://localhost:4000/api/admin/stats');
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const stats = await statsResponse.json();
        displayStats(stats);
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }

    // Fetch recent orders
    try {
        const ordersResponse = await fetch('http://localhost:4000/api/admin/orders');
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
        const orders = await ordersResponse.json();
        displayRecentOrders(orders);
    } catch (error) {
        console.error('Error loading recent orders:', error);
    }

    // Fetch recent products
    try {
        const productsResponse = await fetch('http://localhost:4000/api/admin/products');
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        products = await productsResponse.json(); // Update global products
        displayRecentProducts(products);
    } catch (error) {
        console.error('Error loading recent products:', error);
    }

    // Fetch messages
    try {
        const messagesResponse = await fetch('http://localhost:4000/api/admin/messages');
        if (!messagesResponse.ok) throw new Error('Failed to fetch messages');
        const messages = await messagesResponse.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error loading messages:', error);
    }

    // Fetch reviews
    try {
        const reviewsResponse = await fetch('http://localhost:4000/api/admin/reviews');
        if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews');
        const reviews = await reviewsResponse.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error loading reviews:', error);
    }

    // Display stats
    function displayStats(stats) {
        document.getElementById('total-sales').textContent = `रु. ${stats.totalSales || '0.00'}`;
        document.getElementById('total-orders').textContent = stats.totalOrders || '0';
        document.getElementById('active-users').textContent = stats.activeUsers || '0';
        document.getElementById('total-products').textContent = stats.totalProducts || '0';
    }

    // Display recent orders
    function displayRecentOrders(orders) {
        const orderContainer = document.querySelector('.order-container');
        orderContainer.innerHTML = '';

        orders.slice(0, 4).forEach((order, index) => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.id = `order-${index + 1}`;

            orderCard.innerHTML = `
                <div class="order-image" style="background-image: url('${order.Product.image || '/assets/placeholder-product.jpg'}');"></div>
                <div class="order-info">
                    <p><strong>Order ID:</strong> <span id="order-id-${index + 1}">${order.id}</span></p>
                    <p><strong>Customer:</strong> <span id="customer-${index + 1}">${order.userName || 'Unknown'}</span></p>
                    <p><strong>Status:</strong> <span id="status-${index + 1}">${order.status}</span></p>
                    <p><strong>Total:</strong> <span id="total-${index + 1}">रु. ${parseFloat(order.Product.price).toFixed(2)}</span></p>
                </div>
            `;

            orderContainer.prepend(orderCard);
        });
    }

    function displayRecentProducts(products) {
        const productContainer = document.querySelector('.product-container');
        productContainer.innerHTML = '';

        products.slice(0, 4).forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.id = `product-${index + 1}`;
            productCard.setAttribute('data-product-id', product.id);

            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image || '/assets/placeholder-product.jpg'}');"></div>
                <div class="product-info">
                    <p><strong>ID:</strong> <span id="product-id-${index + 1}">${product.id}</span></p>
                    <p><strong>Name:</strong> <span id="product-name-${index + 1}">${product.name || 'Unknown'}</span></p>
                    <p><strong>Price:</strong> <span id="product-price-${index + 1}">रु. ${parseFloat(product.price || 0).toFixed(2)}</span></p>
                    <p><strong>Stock:</strong> <span id="product-stock-${index + 1}">${product.stockQuantity || 0}</span></p>
                    <p><strong>Category:</strong> <span id="product-category-${index + 1}">${product.category || 'Uncategorized'}</span></p>
                    <div class="actions">
                        <button class="btn edit-btn">Edit</button>
                        <button class="btn delete-btn">Delete</button>
                    </div>
                </div>
            `;

            productContainer.prepend(productCard);
        });

        // Add event listeners for edit and delete
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => openEditModal(button.closest('.product-card').getAttribute('data-product-id')));
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deleteProduct(button.closest('.product-card').getAttribute('data-product-id')));
        });
    }

    // Open edit modal
    function openEditModal(productId) {
        const modal = document.getElementById('editProductModal');
        const product = products.find(p => p.id == productId);

        if (!product) {
            console.error('Product not found for ID:', productId);
            return;
        }

        document.getElementById('modal-product-id').value = product.id;
        document.getElementById('modal-product-name').value = product.name || '';
        document.getElementById('modal-product-price').value = product.price || '';
        document.getElementById('modal-product-stock').value = product.stockQuantity || '';
        document.getElementById('modal-product-category').value = product.category || '';
        document.getElementById('modal-product-image').src = product.image || '/assets/placeholder-product.jpg';

        modal.style.display = 'flex';

        // Handle image change
        document.querySelector('.change-image-btn').addEventListener('click', () => {
            document.getElementById('newProductImage').click();
        });

        document.getElementById('newProductImage').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('modal-product-image').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Confirm edit
    document.getElementById('editProductForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const productId = document.getElementById('modal-product-id').value;
        const name = document.getElementById('modal-product-name').value;
        const price = document.getElementById('modal-product-price').value;
        const stockQuantity = document.getElementById('modal-product-stock').value;
        const category = document.getElementById('modal-product-category').value;
        const newImage = document.getElementById('newProductImage').files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stockQuantity', stockQuantity);
        formData.append('category', category);
        if (newImage) formData.append('newProductImage', newImage);

        try {
            const response = await fetch(`http://localhost:4000/api/admin/products/${productId}`, {
                method: 'PUT',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                document.getElementById('editProductModal').style.display = 'none';
                // Refresh products
                const productsResponse = await fetch('http://localhost:4000/api/admin/products');
                products = await productsResponse.json();
                displayRecentProducts(products);
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('editProductModal').style.display = 'none';
    });

    // Delete product
    async function deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:4000/api/admin/products/${productId}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    // Refresh products
                    const productsResponse = await fetch('http://localhost:4000/api/admin/products');
                    products = await productsResponse.json();
                    displayRecentProducts(products);
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    }

    // Display messages
    function displayMessages(messages) {
        const messageContainer = document.querySelector('.message-container');
        messageContainer.innerHTML = '';

        messages.slice(0, 4).forEach((message, index) => {
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.id = `message-${index + 1}`;

            messageCard.innerHTML = `
                <div class="message-info">
                    <p><strong>From:</strong> <span id="message-user-${index + 1}">${message.name || message.email || 'Unknown'}</span></p>
                    <p><span id="message-text-${index + 1}">${message.message || 'No message'}</span></p>
                </div>
            `;

            messageContainer.prepend(messageCard);
        });
    }

    // Display reviews
    function displayReviews(reviews) {
        const reviewContainer = document.querySelector('.review-container');
        reviewContainer.innerHTML = '';

        reviews.slice(0, 4).forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.id = `review-${index + 1}`;

            reviewCard.innerHTML = `
                <div class="review-image" style="background-image: url('${review.Product.image || '/assets/placeholder-review.jpg'}');"></div>
                <div class="review-content">
                    <p><strong>Product:</strong> <span id="review-product-name-${index + 1}">${review.Product.name || 'Unknown'}</span></p>
                    <p><strong>From:</strong> <span id="review-user-name-${index + 1}">${review.userName || 'Anonymous'}</span></p>
                    <div class="review-rating" id="review-rating-${index + 1}">${'★'.repeat(review.rating || 0)}</div>
                    <p><span id="review-message-${index + 1}">${review.message || 'No review'}</span></p>
                </div>
            `;

            reviewContainer.prepend(reviewCard);
        });
    }
});