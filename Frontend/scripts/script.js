function togglePassword(id) {
  const passwordField = document.getElementById(id);
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);
}

document.querySelector('.register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Password mismatch validation
  if (password !== confirmPassword) {
    Toastify({
      text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
               <div style="background-color: #FF5252; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </div>
               <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">Passwords do not match!</span>
             </div>`,
      duration: 3000,
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
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        contact,
        address,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Success notification with larger text and smaller size
      Toastify({
        text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
                 <div style="background-color: #4CAF50; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                     <polyline points="20 6 9 17 4 12"></polyline>
                   </svg>
                 </div>
                 <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">Registration successful!</span>
               </div>`,
        duration: 1500,
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
        callback: function () {
          window.location.replace('Login.html');
        }
      }).showToast();
    } else {
      // Error notification with larger text and smaller size
      Toastify({
        text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
                 <div style="background-color: #FF5252; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                   </svg>
                 </div>
                 <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">${data.message || "Registration failed!"}</span>
               </div>`,
        duration: 3000,
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
    }
  } catch (error) {
    console.error('Error:', error);
    // Generic error notification with larger text and smaller size
    Toastify({
      text: `<div style="display: flex; align-items: center; gap: 8px; min-height: 40px;">
               <div style="background-color: #FF5252; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </div>
               <span style="font-size: 20px; font-weight: 700; flex-grow: 1;">Error during registration!</span>
             </div>`,
      duration: 3000,
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
  }
});