// // document.addEventListener('DOMContentLoaded', async function () {
// //     // Fetch cart items from API
// //     try {
// //         const userId = 1; // Mock userId for now (replace with auth later)
// //         const response = await fetch(`http://localhost:4000/api/cart?userId=${userId}`);
// //         const cartItems = await response.json();
// //         displayCartItems(cartItems);
// //     } catch (error) {
// //         console.error('Error fetching cart:', error);
// //     }

// //     // Function to display cart items
// //     function displayCartItems(cartItems) {
// //         const cartItemsContainer = document.getElementById('cart-items');
// //         cartItemsContainer.innerHTML = '';

// //         if (!cartItems || cartItems.length === 0) {
// //             cartItemsContainer.innerHTML = '<p class="no-items">Your cart is empty</p>';
// //             return;
// //         }

// //         cartItems.forEach(item => {
// //             const cartItem = document.createElement('div');
// //             cartItem.className = 'cart-item';
// //             cartItem.id = `cart-item-${item.id}`;

// //             cartItem.innerHTML = `
// //                 <div class="item-image" style="background-image: url('${item.Product.image}');"></div>
// //                 <div class="item-details">
// //                     <h3 id="item-name-${item.id}">${item.Product.name}</h3>
// //                     <p class="item-price" id="item-price-${item.id}">रु. ${parseFloat(item.Product.price).toFixed(2)}</p>
// //                     <p class="item-points" id="item-points-${item.id}">${item.Product.stockQuantity} in stock</p> <!-- Placeholder for now -->
// //                 </div>
// //                 <div class="item-actions">
// //                     <button class="btn remove-btn" data-id="${item.id}">Remove</button>
// //                     <a href="../pages/checkout.html?productId=${item.productId}" class="btn checkout-btn">Proceed to Checkout</a>
// //                 </div>
// //             `;

// //             cartItemsContainer.appendChild(cartItem);
// //         });

// //         // Setup event listeners for remove buttons (to be implemented)
// //         setupEventListeners();
// //     }

// //     function setupEventListeners() {
// //         // Mobile menu button
// //         document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
// //             document.querySelector('.nav-center').classList.toggle('nav-active');
// //             document.querySelector('.icon-buttons').classList.toggle('nav-active');
// //             this.classList.toggle('open');
// //         });

// //         // Logout button
// //         document.getElementById('logout-btn').addEventListener('click', function (event) {
// //             event.preventDefault();
// //             const userConfirmed = confirm("Are you sure you want to log out?");
// //             if (userConfirmed) {
// //                 window.location.href = "../pages/HomePage.html";
// //             } else {
// //                 return;
// //             }
// //         });

// //         // Remove buttons (placeholder)
// //         document.querySelectorAll('.remove-btn').forEach(button => {
// //             button.addEventListener('click', function (e) {
// //                 e.preventDefault();
// //                 const cartId = this.getAttribute('data-id');
// //                 alert(`Removing item ${cartId} from cart!`);
// //                 // Implement remove functionality here
// //             });
// //         });
// //     }
// // });

// document.addEventListener('DOMContentLoaded', async function () {
//     // Fetch cart items from API
//     try {
//         const userId = 1; // Mock userId
//         const response = await fetch(`http://localhost:4000/api/cart?userId=${userId}`);
//         const cartItems = await response.json();
//         displayCartItems(cartItems);
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//     }

//     // Function to display cart items
//     function displayCartItems(cartItems) {
//         const cartItemsContainer = document.getElementById('cart-items');
//         cartItemsContainer.innerHTML = '';

//         if (!cartItems || cartItems.length === 0) {
//             cartItemsContainer.innerHTML = '<p class="no-items">Your cart is empty</p>';
//             return;
//         }

//         cartItems.reverse().forEach(item => {
//             const cartItem = document.createElement('div');
//             cartItem.className = 'cart-item';
//             cartItem.id = `cart-item-${item.id}`;

//             cartItem.innerHTML = `
//                 <div class="item-image" style="background-image: url('${item.Product.image}');"></div>
//                 <div class="item-details">
//                     <h3 id="item-name-${item.id}">${item.Product.name}</h3>
//                     <p class="item-price" id="item-price-${item.id}">रु. ${parseFloat(item.Product.price).toFixed(2)}</p>
//                     <p class="item-stock" id="item-stock-${item.id}">${item.Product.stockQuantity} in stock</p>
//                 </div>
//                 <div class="item-actions">
//                     <button class="btn remove-btn" data-id="${item.id}">Remove</button>
//                     <a href="../pages/checkout.html?productId=${item.productId}" class="btn checkout-btn">Proceed to Checkout</a>
//                 </div>
//             `;

//             cartItemsContainer.appendChild(cartItem);
//         });

//         // Setup event listeners
//         setupEventListeners();
//     }

//     function setupEventListeners() {
//         // Mobile menu button
//         document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
//             document.querySelector('.nav-center').classList.toggle('nav-active');
//             document.querySelector('.icon-buttons').classList.toggle('nav-active');
//             this.classList.toggle('open');
//         });

//         // Logout button
//         document.getElementById('logout-btn').addEventListener('click', function (event) {
//             event.preventDefault();
//             const userConfirmed = confirm("Are you sure you want to log out?");
//             if (userConfirmed) {
//                 window.location.href = "../pages/HomePage.html";
//             } else {
//                 return;
//             }
//         });

//         // Remove buttons
//         document.querySelectorAll('.remove-btn').forEach(button => {
//             button.addEventListener('click', async function (e) {
//                 e.preventDefault();
//                 const cartId = this.getAttribute('data-id');

//                 try {
//                     const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
//                         method: 'DELETE'
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         alert(data.message);
//                         // Refresh cart
//                         const userId = 1; // Mock userId
//                         const newResponse = await fetch(`http://localhost:4000/api/cart?userId=${userId}`);
//                         const newCartItems = await newResponse.json();
//                         displayCartItems(newCartItems);
//                     } else {
//                         alert('Error: ' + data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error removing from cart:', error);
//                     alert('Failed to remove from cart');
//                 }
//             });
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', async function () {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if no token
        window.location.href = '../pages/login.html';
        return;
    }

    // Fetch cart items from API
    try {
        const response = await fetch('http://localhost:4000/api/cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            // Token expired or invalid
            alert('Session expired. Please login again.');
            localStorage.removeItem('token');
            window.location.href = '../pages/login.html';
            return;
        }

        const cartItems = await response.json();
        displayCartItems(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }

    // Function to display cart items
    function displayCartItems(cartItems) {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (!cartItems || cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="no-items">Your cart is empty</p>';
            return;
        }

        cartItems.reverse().forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.id = `cart-item-${item.id}`;

            cartItem.innerHTML = `
                <div class="item-image" style="background-image: url('${item.Product.image}');"></div>
                <div class="item-details">
                    <h3 id="item-name-${item.id}">${item.Product.name}</h3>
                    <p class="item-price" id="item-price-${item.id}">रु. ${parseFloat(item.Product.price).toFixed(2)}</p>
                    <p class="item-stock" id="item-stock-${item.id}">${item.Product.stockQuantity} in stock</p>
                </div>
                <div class="item-actions">
                    <button class="btn remove-btn" data-id="${item.id}">Remove</button>
                    <a href="../pages/checkout.html?productId=${item.productId}" class="btn checkout-btn">Proceed to Checkout</a>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
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

        // Update the remove button event listener to include the token
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const cartId = this.getAttribute('data-id');

                try {
                    const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
                        method: 'DELETE',
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

                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                        // Refresh cart
                        const newResponse = await fetch('http://localhost:4000/api/cart', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const newCartItems = await newResponse.json();
                        displayCartItems(newCartItems);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error removing from cart:', error);
                    alert('Failed to remove from cart');
                }
            });
        });
    }
});