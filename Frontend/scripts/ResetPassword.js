function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
}

document.querySelector('.reset-password-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Client-side validation
    if (!email || !newPassword || !confirmPassword) {
        showToast('Please fill in all fields!', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/user/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Password reset successfully!', 'success', () => {
                window.location.replace('Login.html');
            });
        } else {
            showToast(data.message || 'Reset failed!', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred!', 'error');
    }
});

// Helper function to show Toastify notifications
function showToast(message, type, callback) {
    const isSuccess = type === 'success';
    Toastify({
        text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
               <div style="background-color: ${isSuccess ? '#4CAF50' : '#FF5252'}; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                   ${isSuccess ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
                 </svg>
               </div>
               <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">${message}</span>
             </div>`,
        duration: isSuccess ? 1500 : 3000,
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
        },
        callback: callback || null
    }).showToast();
}