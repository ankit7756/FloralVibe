// home page navigation
document.getElementById('logout-btn').addEventListener('click', function () {
    const userConfirmed = confirm("Are you sure you want to log out?");

    if (userConfirmed) {
        window.location.href = "HomePage.html";
    }
});
