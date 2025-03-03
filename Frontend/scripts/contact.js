document.addEventListener('DOMContentLoaded', async function () {
    // Submit message
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found in DOM');
        return;
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const userName = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const userId = 1; // Mock userId

        if (!userName || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, userName, email, message })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                this.reset(); // Clear form
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    });

    // Mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            document.querySelector('.nav-center').classList.toggle('nav-active');
            document.querySelector('.auth-buttons').classList.toggle('auth-active');
            this.classList.toggle('open');
        });
    } else {
        console.warn('Mobile menu button not found');
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const userConfirmed = confirm("Are you sure you want to log out?");
            if (userConfirmed) {
                window.location.href = "../pages/HomePage.html";
            }
        });
    } else {
        console.warn('Logout button not found');
    }
});