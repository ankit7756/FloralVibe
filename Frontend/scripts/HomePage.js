document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    // If no token, we still allow access to HomePage as it's the main landing page
    if (token) {
        try {
            const response = await fetch('http://localhost:4000/api/user/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // If token is invalid, clear it but don't redirect
                localStorage.clear();
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            localStorage.clear();
        }
    }
});
