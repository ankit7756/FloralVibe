function generateUserId() {
    const prefix = 'U';
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${randomNum}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userId').value = generateUserId();
});

document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newUser = {
        id: document.getElementById('userId').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
        role: document.getElementById('role').value
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    alert('User added successfully!');

    window.location.href = 'dashboard.html';
});