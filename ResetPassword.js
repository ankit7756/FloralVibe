function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
}

function validateForm() {
    const email = document.getElementById("email").value;
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (email !== "user@example.com" || oldPassword !== "oldPassword123") {
        alert("Incorrect email or old password");
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return false;
    }

    alert("Password reset successfully!");
    return true;
}
