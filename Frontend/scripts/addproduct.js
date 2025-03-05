document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('description', document.getElementById('productDescription').value);
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('category', document.getElementById('productCategory').value);
    formData.append('stockQuantity', document.getElementById('stockQuantity').value);
    formData.append('productImage', document.getElementById('productImage').files[0]);

    try {
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            alert('Product added successfully!');
            document.getElementById('addProductForm').reset();
            window.location.href = '../pages/dashboard.html';
        } else {
            alert('Error adding product: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});