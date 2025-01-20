document.getElementById('payment-method').addEventListener('change', function () {
    const paymentMethod = this.value;
    const paymentDetails = document.getElementById('payment-details');

    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        paymentDetails.style.display = 'block';
    } else {
        paymentDetails.style.display = 'none';
    }
});

// Optionally, you can add form validation or simulate the payment process here
document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting to demonstrate the process

    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        const paymentAmount = document.getElementById('payment-amount').value;

        alert(`Payment of NPR ${paymentAmount} to 9861790119 was successful.`);
    } else {
        alert('Order placed successfully (Cash on Delivery).');
    }
});
