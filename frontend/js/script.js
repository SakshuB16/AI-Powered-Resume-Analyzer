// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Function to handle login form submission
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get user input
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate inputs (simple check)
        if (username && password) {
            // Save user info (for demo purposes, replace with actual login logic)
            localStorage.setItem('username', username);
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to Home Page (adjust as needed)
        } else {
            alert('Please enter both username and password.');
        }
    });

    // Handle file upload for the Explore tab
    const uploadButton = document.getElementById('upload-resume');
    const resultArea = document.getElementById('parsed-text');
    
    if (uploadButton) {
        uploadButton.addEventListener('change', function (e) {
            const file = e.target.files[0];

            if (file) {
                const formData = new FormData();
                formData.append('resume', file);

                // Make the API call to the Flask backend
                fetch('/upload-resume', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.extracted_text) {
                        resultArea.textContent = data.extracted_text;  // Display the extracted text
                    } else if (data.error) {
                        resultArea.textContent = `Error: ${data.error}`;  // Display error message
                    }
                })
                .catch(error => {
                    resultArea.textContent = `An error occurred: ${error.message}`;
                });
            }
        });
    }

    // Show user's name on Home page after login
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('username');
        if (username) {
            usernameDisplay.textContent = `Welcome, ${username}`;
        }
    }

    // Handle tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            // Show the selected tab content
            tabContents[index].classList.add('active');
        });
    });

});

