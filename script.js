document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM elements
    const toggleBtn = document.getElementById("toggle-form");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleText = document.getElementById("toggle-text");
    const emailField = document.getElementById("email-field");
    const usernameField = document.getElementById("username-field");
    const container = document.getElementById("form-container");
    const film = document.getElementById("film");
    const form = document.getElementById("auth-form");
    const forgotPassword = document.getElementById("forgot-password");
    const statusMessage = document.getElementById("status-message");
    const loadingSpinner = document.getElementById("loading-spinner");
    
    // Check if user is already logged in
    // Check if user is already logged in
    auth.onAuthStateChanged(user => {
    if (user) {
        showMessage(`Welcome back, ${user.displayName || user.email}!`, "success");
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1500);
    }
}); 
    
    // Toggle between login and signup forms
    function toggleForm(event) {
        event.preventDefault();
        resetForm();
        film.classList.add("fade-in");

        setTimeout(() => {
            if (formTitle.textContent === "Login") {
                formTitle.textContent = "Sign Up";
                submitBtn.textContent = "Sign Up";
                toggleText.innerHTML = "Already have an account?<a href='#' id='toggle-form'>Login</a>";
                emailField.classList.remove("hidden");
                forgotPassword.style.display = "none";
            } else {
                formTitle.textContent = "Login";
                submitBtn.textContent = "Login";
                toggleText.innerHTML = "Don't have an account?<a href='#' id='toggle-form'>Sign Up</a>";
                emailField.classList.add("hidden");
                forgotPassword.style.display = "block";
            }

            setTimeout(() => {
                film.classList.remove("fade-in");
                document.getElementById("toggle-form").addEventListener("click", toggleForm);
            }, 500);
        }, 500);

        document.getElementById("toggle-form").removeEventListener("click", toggleForm);
    }
    
    // Show status message
    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = "status-message";
        statusMessage.classList.add(type);
        statusMessage.style.display = "block";
        
        // Hide after 5 seconds
        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    }
    
    // Show loading state
    function setLoading(isLoading) {
        if (isLoading) {
            loadingSpinner.style.display = "block";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
        } else {
            loadingSpinner.style.display = "none";
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        }
    }
    
    // Reset form and error messages
    function resetForm() {
        statusMessage.style.display = "none";
        document.getElementById("username-error").style.display = "none";
        document.getElementById("email-error").style.display = "none";
        document.getElementById("password-error").style.display = "none";
        document.getElementById("username").style.borderBottomColor = "";
        document.getElementById("email").style.borderBottomColor = "";
        document.getElementById("password").style.borderBottomColor = "";
    }
    
    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        resetForm();
        
        const isSignUp = formTitle.textContent === "Sign Up";
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        let email = "";
        
        // Basic validation
        let isValid = true;
        
        // Validate username
        if (!username) {
            document.getElementById("username").style.borderBottomColor = "#ff6b6b";
            document.getElementById("username-error").style.display = "block";
            isValid = false;
        }
        
        // Validate email for signup
        if (isSignUp) {
            email = document.getElementById("email").value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                document.getElementById("email").style.borderBottomColor = "#ff6b6b";
                document.getElementById("email-error").style.display = "block";
                isValid = false;
            }
        } else {
            // For login, use username as email (assuming username is an email)
            email = username;
        }
        
        // Validate password
        if (password.length < 8) {
            document.getElementById("password").style.borderBottomColor = "#ff6b6b";
            document.getElementById("password-error").style.display = "block";
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        setLoading(true);
        
        if (isSignUp) {
            // Create new user
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Update profile with username
                    return userCredential.user.updateProfile({
                        displayName: username
                    });
                })
                .then(() => {
                    showMessage("Account created successfully! Verification email sent.", "success");
                    // Send email verification
                    auth.currentUser.sendEmailVerification();
                    form.reset();
                    // Switch back to login
                    setTimeout(() => {
                        toggleForm(new Event("click"));
                    }, 2000);
                })
                .catch((error) => {
                    showMessage(error.message, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // Login existing user
            // Login existing user
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                showMessage(`Welcome back, ${userCredential.user.displayName || userCredential.user.email}!`, "success");
                form.reset();
    
    // Redirect to home page
         setTimeout(() => {
            window.location.href = "home.html";
            }, 1500);
        })
        .catch((error) => {
        showMessage(error.message, "error");
    })
        .finally(() => {
        setLoading(false);
        });
        }
    }
    
    // Handle forgot password
    function handleForgotPassword(e) {
        e.preventDefault();
        
        const email = document.getElementById("username").value.trim();
        if (!email) {
            showMessage("Please enter your email in the username field", "error");
            return;
        }
        
        setLoading(true);
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                showMessage("Password reset email sent. Check your inbox.", "success");
            })
            .catch((error) => {
                showMessage(error.message, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    // Handle social login
     // Handle social login
function handleSocialLogin(provider) {
    setLoading(true);
    
    auth.signInWithPopup(provider)
        .then((result) => {
            showMessage(`Welcome, ${result.user.displayName || result.user.email}!`, "success");
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);
        })
        .catch((error) => {
            showMessage(error.message, "error");
        })
        .finally(() => {
            setLoading(false);
        });
}
    
    // Event listeners
    toggleBtn.addEventListener("click", toggleForm);
    form.addEventListener("submit", handleFormSubmit);
    forgotPassword.addEventListener("click", handleForgotPassword);
    
    // Social login event listeners
    document.getElementById("google-login").addEventListener("click", () => handleSocialLogin(googleProvider));
    document.getElementById("facebook-login").addEventListener("click", () => handleSocialLogin(facebookProvider));
    document.getElementById("github-login").addEventListener("click", () => handleSocialLogin(githubProvider));
    
    // Prevent video from causing layout issues
    window.addEventListener('resize', function() {
        const iframe = document.querySelector('.video-background iframe');
        if (window.innerWidth / window.innerHeight > 16/9) {
            iframe.style.width = '100vw';
            iframe.style.height = '56.25vw';
        } else {
            iframe.style.width = '177.78vh';
            iframe.style.height = '100vh';
        }
    });
    
    // Initialize iframe size
    window.dispatchEvent(new Event('resize'));
});