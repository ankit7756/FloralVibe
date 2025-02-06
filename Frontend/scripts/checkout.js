document.getElementById('payment-method').addEventListener('change', function () {
    const paymentMethod = this.value;
    const paymentDetails = document.getElementById('payment-details');

    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        paymentDetails.style.display = 'block';
    } else {
        paymentDetails.style.display = 'none';
    }
});

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        const paymentAmount = document.getElementById('payment-amount').value;

        alert(`Payment of NPR ${paymentAmount} to 9861790119 was successful.`);
    } else {
        alert('Order placed successfully (Cash on Delivery).');
    }
});

document.getElementById('logout-btn').addEventListener('click', function () {
    const userConfirmed = confirm("Are you sure you want to log out?");

    if (userConfirmed) {
        window.location.href = "HomePage.html";
    }
});

