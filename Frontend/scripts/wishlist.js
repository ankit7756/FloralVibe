document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../pages/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/wishlist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            alert('Session expired. Please login again.');
            localStorage.removeItem('token');
            window.location.href = '../pages/login.html';
            return;
        }

        const wishlistItems = await response.json();
        displayWishlistItems(wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }

    function displayWishlistItems(wishlistItems) {
        const wishlistItemsContainer = document.getElementById('wishlist-items');
        wishlistItemsContainer.innerHTML = '';

        if (!wishlistItems || wishlistItems.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="no-items">Your wishlist is empty</p>';
            return;
        }

        wishlistItems.reverse().forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.id = `wishlist-item-${item.id}`;

            wishlistItem.innerHTML = `
                <div class="item-image" style="background-image: url('${item.Product.image}');"></div>
                <div class="item-details">
                    <h3 id="item-name-${item.id}">${item.Product.name}</h3>
                    <p class="item-price" id="item-price-${item.id}">रु. ${parseFloat(item.Product.price).toFixed(2)}</p>
                    <p class="item-stock" id="item-stock-${item.id}">${item.Product.stockQuantity} in stock</p>
                </div>
                <div class="item-actions">
                    <button class="btn remove-btn" data-id="${item.id}">Remove</button>
                    <a href="#" class="btn add-to-cart" data-id="${item.productId}">Add to Cart</a>
                </div>
            `;

            wishlistItemsContainer.appendChild(wishlistItem);
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

        document.getElementById('logout-btn').addEventListener('click', function (event) {
            event.preventDefault();
            const userConfirmed = confirm("Are you sure you want to log out?");
            if (userConfirmed) {
                localStorage.removeItem('token');
                window.location.href = "../pages/HomePage.html";
            } else {
                return;
            }
        });


        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const wishlistId = this.getAttribute('data-id');

                try {
                    // CHANGED: Include auth token in request headers
                    const response = await fetch(`http://localhost:4000/api/wishlist/${wishlistId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    // CHANGED: Handle unauthorized response
                    if (response.status === 401) {
                        alert('Session expired. Please login again.');
                        localStorage.removeItem('token');
                        window.location.href = '../pages/login.html';
                        return;
                    }

                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                        // Refresh wishlist
                        // CHANGED: Include auth token in request headers
                        const newResponse = await fetch('http://localhost:4000/api/wishlist', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const newWishlistItems = await newResponse.json();
                        displayWishlistItems(newWishlistItems);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error removing from wishlist:', error);
                    alert('Failed to remove from wishlist');
                }
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                // CHANGED: Removed userId from request body

                try {
                    // CHANGED: Include auth token in request headers
                    const response = await fetch('http://localhost:4000/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ productId })
                    });

                    // CHANGED: Handle unauthorized response
                    if (response.status === 401) {
                        alert('Session expired. Please login again.');
                        localStorage.removeItem('token');
                        window.location.href = '../pages/login.html';
                        return;
                    }

                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    alert('Failed to add to cart');
                }
            });
        });
    }
});       