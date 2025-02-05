document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    
    if (!username) {
        window.location.href = "index.html"; // Redirect to login if not authenticated
    }

    document.getElementById("username").textContent = username;

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "index.html";
    });
});
