function generateProductId() {
    const prefix = 'P';
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${randomNum}`;
}

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const productImage = document.getElementById('productImage').files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const newProduct = {
            id: generateProductId(),
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: document.getElementById('productPrice').value,
            image: e.target.result,
            category: document.getElementById('productCategory').value,
            stock: document.getElementById('stockQuantity').value
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];

        products.push(newProduct);

        localStorage.setItem('products', JSON.stringify(products));

        alert('Product added successfully!');

        window.location.href = 'dashboard.html';
    };

    if (productImage) {
        reader.readAsDataURL(productImage);
    }
});