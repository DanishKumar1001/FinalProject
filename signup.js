// signup.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    
    // Send a POST request to your server to create a new user
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Redirect to the login page on successful signup
            window.location.href = "/index.html";
        } else {
            alert("Signup failed. Please try again.");
        }
    });
});
