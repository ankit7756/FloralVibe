document.getElementById('logout-btn').addEventListener('click', function () {
    const userConfirmed = confirm("Are you sure you want to log out?");

    if (userConfirmed) {
        window.location.href = "HomePage.html";
    }
});

document.querySelectorAll('.star-rating .fa-star').forEach(star => {
    star.addEventListener('click', function () {
        const rating = this.getAttribute('data-rating');
        const stars = this.parentElement.querySelectorAll('.fa-star');
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});
