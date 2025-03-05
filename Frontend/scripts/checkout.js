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
            console.warn('Error fetching product, using placeholder:', error);
            displayProductDetails(null);
        }
    }

    // Display product details
    function displayProductDetails(product) {
        const productImage = document.querySelector('.product-image');
        const productName = document.getElementById('product-name');
        const productPrice = document.getElementById('product-price');

        if (product) {
            productImage.style.backgroundImage = `url('${product.image}')`;
            productName.textContent = product.name;
            productPrice.textContent = `Price: रु. ${parseFloat(product.price).toFixed(2)}`;
        } else {
            productImage.style.backgroundImage = `url('../assets/placeholder-flower.jpg')`;
            productName.textContent = 'Product Not Found';
            productPrice.textContent = 'Price: Loading...';
        }
    }

    let isPaymentConfirmed = false; // Track eSewa payment confirmation

    // Mobile menu button
    document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
        document.querySelector('.nav-center').classList.toggle('nav-active');
        document.querySelector('.auth-buttons').classList.toggle('nav-active');
        this.classList.toggle('open');
    });

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function () {
        const userConfirmed = confirm("Are you sure you want to log out?");
        if (userConfirmed) {
            window.location.href = "../pages/HomePage.html";
        }
    });

    // Payment method selection and modal handling
    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentModal = document.getElementById('paymentModal');
    paymentMethodSelect.addEventListener('change', function () {
        const paymentMethod = this.value;
        if (paymentMethod === 'esewa') {
            paymentModal.style.display = 'flex';
            isPaymentConfirmed = false; // Reset on method change
        } else {
            paymentModal.style.display = 'none';
        }
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', function () {
        paymentModal.style.display = 'none';
    });

    // Confirm payment and show toast
    document.querySelector('.confirm-payment').addEventListener('click', function () {
        paymentModal.style.display = 'none';
        isPaymentConfirmed = true; // Set confirmation flag

        Toastify({
            text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
                   <div style="background-color: #4CAF50; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                       <polyline points="20 6 9 17 4 12"></polyline>
                     </svg>
                   </div>
                   <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">Payment Confirmed!</span>
                 </div>`,
            duration: 2000,
            close: false,
            gravity: "top",
            position: "right",
            escapeMarkup: false,
            style: {
                background: "white",
                color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "8px 12px",
                minWidth: "250px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0"
            }
        }).showToast();
    });

    // Place order submission
    document.getElementById('checkoutForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const paymentMethod = paymentMethodSelect.value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;
        const productId = urlParams.get('productId');

        if (paymentMethod === 'esewa' && !isPaymentConfirmed) {
            alert('Please confirm eSewa payment before placing the order.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, name, address, contact, paymentMethod })
            });
            const data = await response.json();
            if (response.ok) {
                Toastify({
                    text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
                           <div style="background-color: #4CAF50; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                               <polyline points="20 6 9 17 4 12"></polyline>
                             </svg>
                           </div>
                           <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">Order placed successfully!</span>
                         </div>`,
                    duration: 2000,
                    close: false,
                    gravity: "top",
                    position: "right",
                    escapeMarkup: false,
                    style: {
                        background: "white",
                        color: "#333",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        padding: "8px 12px",
                        minWidth: "250px",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0"
                    }
                }).showToast();
                this.reset();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    });
});