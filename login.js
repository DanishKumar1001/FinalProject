document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Sending a POST request to your server to validate the login
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Redirect to the home page on successful login
            window.location.href = "/live-code.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    });
});
