// document.addEventListener('DOMContentLoaded', async function () {
//     // Fetch products from API
//     try {
//         const response = await fetch('http://localhost:4000/api/products');
//         const products = await response.json();
//         displayProducts(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }

//     // Function to display products
//     function displayProducts(products) {
//         const productsGrid = document.getElementById('products-grid');

//         // Clear existing products
//         productsGrid.innerHTML = '';

//         if (products.length === 0) {
//             productsGrid.innerHTML = '<p class="no-products">No products found</p>';
//             return;
//         }

//         // Create product cards
//         products.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.className = 'product-card';
//             productCard.id = `product-${product.id}`;

//             productCard.innerHTML = `
//                 <div class="product-image" style="background-image: url('${product.image}');"></div>
//                 <div class="product-details">
//                     <h3 id="product-name-${product.id}">${product.name}</h3>
//                     <div class="product-rating">
//                         <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
//                         <span>(4.0)</span>
//                     </div>
//                     <p class="product-price" id="product-price-${product.id}">रु. ${parseFloat(product.price).toFixed(2)}</p>
//                     <p class="product-stock" id="product-stock-${product.id}">${product.stockQuantity} in stock</p>
//                     <div class="product-actions">
//                         <a href="#" class="btn add-to-cart" data-id="${product.id}">Add to Cart</a>
//                         <a href="#" class="btn buy-now" data-id="${product.id}">Buy Now</a>
//                         <a href="#" class="btn wishlist" data-id="${product.id}">Add to Wishlist</a>
//                     </div>
//                 </div>
//             `;

//             productsGrid.appendChild(productCard);
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
//             }
//         });

//         // Search functionality
//         document.getElementById('search-bar').addEventListener('input', function () {
//             const searchQuery = this.value.toLowerCase();
//             const productCards = document.querySelectorAll('.product-card');
//             let visibleProducts = 0;

//             productCards.forEach(card => {
//                 const name = card.querySelector('h3').textContent.toLowerCase();
//                 if (searchQuery === '' || name.includes(searchQuery)) {
//                     card.style.display = 'flex';
//                     visibleProducts++;
//                 } else {
//                     card.style.display = 'none';
//                 }
//             });
//         });

//         // Add to cart buttons
//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             button.addEventListener('click', async function (e) {
//                 e.preventDefault();
//                 const productId = this.getAttribute('data-id');

//                 // Mock userId for now (replace with auth later)
//                 const userId = 1; // Placeholder, assume logged-in user ID

//                 try {
//                     const response = await fetch('http://localhost:4000/api/cart', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({ productId, userId })
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         alert(data.message);
//                     } else {
//                         alert('Error: ' + data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error adding to cart:', error);
//                     alert('Failed to add to cart');
//                 }
//             });
//         });

//         // Buy now buttons
//         document.querySelectorAll('.buy-now').forEach(button => {
//             button.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 const productId = this.getAttribute('data-id');
//                 alert(`Proceeding to checkout with product ${productId}!`);
//                 // Implement checkout functionality here
//             });
//         });

//         // Wishlist buttons
//         document.querySelectorAll('.wishlist').forEach(button => {
//             button.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 const productId = this.getAttribute('data-id');
//                 alert(`Product ${productId} added to wishlist!`);
//                 // Implement wishlist functionality here
//             });
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', async function () {
    // Fetch products from API
    try {
        const response = await fetch('http://localhost:4000/api/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    // Function to display products
    function displayProducts(products) {
        const productsGrid = document.getElementById('products-grid');

        // Clear existing products
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products found</p>';
            return;
        }

        // Create product cards
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.id = `product-${product.id}`;

            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}');"></div>
                <div class="product-details">
                    <h3 id="product-name-${product.id}">${product.name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
                        <span>(4.0)</span>
                    </div>
                    <p class="product-price" id="product-price-${product.id}">रु. ${parseFloat(product.price).toFixed(2)}</p>
                    <p class="product-stock" id="product-stock-${product.id}">${product.stockQuantity} in stock</p>
                    <div class="product-actions">
                        <a href="#" class="btn add-to-cart" data-id="${product.id}">Add to Cart</a>
                        <a href="#" class="btn buy-now" data-id="${product.id}">Buy Now</a>
                        <a href="#" class="btn wishlist" data-id="${product.id}">Add to Wishlist</a>
                    </div>
                </div>
            `;

            productsGrid.appendChild(productCard);
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
            }
        });

        // Search functionality
        document.getElementById('search-bar').addEventListener('input', function () {
            const searchQuery = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            let visibleProducts = 0;

            productCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                if (searchQuery === '' || name.includes(searchQuery)) {
                    card.style.display = 'flex';
                    visibleProducts++;
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                const userId = 1; // Mock userId

                try {
                    const response = await fetch('http://localhost:4000/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId, userId })
                    });
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

        // Buy now buttons
        document.querySelectorAll('.buy-now').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                alert(`Proceeding to checkout with product ${productId}!`);
                // Implement checkout functionality here
            });
        });

        // Add to wishlist buttons
        document.querySelectorAll('.wishlist').forEach(button => {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                const userId = 1; // Mock userId

                try {
                    const response = await fetch('http://localhost:4000/api/wishlist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId, userId })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error adding to wishlist:', error);
                    alert('Failed to add to wishlist');
                }
            });
        });
    }
});