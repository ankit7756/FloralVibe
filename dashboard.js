function loadUsers() {
    const usersTableBody = document.querySelector('#users tbody');
    usersTableBody.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn edit" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn delete" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

document.getElementById('addUserBtn').addEventListener('click', function () {
    window.location.href = 'addUser.html';
});

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));

        loadUsers();
        alert("User deleted successfully!");
    }
}

function editUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === userId);

    if (user) {
        const newName = prompt("Enter new name:", user.name);
        const newEmail = prompt("Enter new email:", user.email);
        const newRole = prompt("Enter new role:", user.role);

        if (newName && newEmail && newRole) {
            user.name = newName;
            user.email = newEmail;
            user.role = newRole;

            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            alert("User updated successfully!");
        } else {
            alert("All fields are required.");
        }
    } else {
        alert("User not found.");
    }
}

document.addEventListener('DOMContentLoaded', loadUsers);