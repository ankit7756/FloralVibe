function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
}

function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const defaultUsername = 'floralvibe';
    const defaultEmail = 'floralvibe@gmail.com';
    const defaultPassword = 'floralvibe123';

    if (username === defaultUsername && email === defaultEmail && password === defaultPassword) {
        alert('Login successful');

        window.location.href = 'dashboard.html';
        return false;
    } else {
        alert('Incorrect username, email, or password');
        return false;
    }
}
