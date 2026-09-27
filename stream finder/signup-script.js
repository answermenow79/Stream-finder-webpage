document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');

    const loginDetails = {
        "test@gmail.com": "Test"
    };

    function authenticateUser() {
        const cleanEmail = emailInput.value.toLowerCase().trim();
        const userPassword = passwordInput.value;

        if (cleanEmail in loginDetails) {
            const storedPassword = loginDetails[cleanEmail];
            return storedPassword === userPassword;
        }

        return false;
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        setLoadingState(true);

        if (authenticateUser()) {
            const cleanEmail = emailInput.value.toLowerCase().trim();

            // Save session data to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', cleanEmail);

            alert("Successful");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
            setLoadingState(false);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.innerText;
            submitBtn.innerHTML = `
                <span class="inline-flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                </span>
            `;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
        } else {
            submitBtn.disabled = false;
            submitBtn.innerText = submitBtn.dataset.originalText || 'Create account';
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
        }
    }
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('d', 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.03 10.03 0 013.122-.563c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-6.177-3.83A3.001 3.001 0 0012 9a3 3 0 00-2.828 2.01m3.839 2.83A3 3 0 019 12M3 3l18 18');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('d', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z');
    }
}