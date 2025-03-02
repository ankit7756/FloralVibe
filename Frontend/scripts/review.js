document.addEventListener('DOMContentLoaded', async function () {
    // Fetch product details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    if (productId) {
        try {
            const response = await fetch(`http://localhost:4000/api/products/${productId}`);
            if (!response.ok) throw new Error('Product not found');
            const product = await response.json();
            displayProductDetails(product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    // Display product details
    function displayProductDetails(product) {
        const productImage = document.querySelector('#product-image');
        const productName = document.getElementById('product-name');
        const productDescription = document.getElementById('product-description');

        if (product) {
            productImage.style.backgroundImage = `url('${product.image}')`;
            productName.textContent = product.name;
            productDescription.textContent = product.description || 'No description available';
        } else {
            productImage.style.backgroundImage = `url('/assets/placeholder-flower.jpg')`; // Adjusted path
            productName.textContent = 'Product Not Found';
            productDescription.textContent = 'No description available';
        }
    }

    // Star-clicking functionality
    document.querySelectorAll('#star-rating .fa-star').forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-rating');
            const stars = this.parentElement.querySelectorAll('.fa-star');
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            document.getElementById('rating').value = rating; // Update hidden input
        });
    });

    // Submit review
    const reviewForm = document.querySelector('#reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const rating = document.getElementById('rating').value;
            const message = document.getElementById('review-text').value; // Match HTML id
            const productId = urlParams.get('productId');

            if (!rating || !message || !productId) {
                alert('Please select a rating and write a review.');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId, rating, message })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    this.reset(); // Clear form
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Failed to submit review');
            }
        });
    } else {
        console.error('Review form not found in DOM');
    }

    // Mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            document.querySelector('.nav-center').classList.toggle('nav-active');
            document.querySelector('.auth-buttons').classList.toggle('auth-active');
            this.classList.toggle('open');
        });
    } else {
        console.warn('Mobile menu button not found');
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const userConfirmed = confirm("Are you sure you want to log out?");
            if (userConfirmed) {
                window.location.href = "../pages/HomePage.html";
            }
        });
    } else {
        console.warn('Logout button not found');
    }
});