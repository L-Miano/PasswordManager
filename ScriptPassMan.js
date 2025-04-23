document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const saveButton = document.getElementById('saveButton');
    const websiteInput = document.getElementById('website');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordList = document.getElementById('passwordList').getElementsByTagName('tbody')[0];
    const generateButton = document.getElementById('generatePassword');

    // Load passwords from localStorage or initialize empty array
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    // Render saved passwords in the table
    function renderPasswords() {
        passwordList.innerHTML = '';
        passwords.forEach((entry, index) => {
            const row = passwordList.insertRow();
            row.innerHTML = `
                <td>${entry.website}</td>
                <td>${entry.username}</td>
                <td>
                    <input type="password" id="password-${index}" value="${entry.password}" disabled />
                    <button onclick="togglePassword(${index})" id="toggle-${index}">Show</button>
                </td>
                <td class="actions">
                    <button onclick="deletePassword(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Toggle password visibility
    window.togglePassword = function (index) {
        const passwordField = document.getElementById(`password-${index}`);
        const toggleButton = document.getElementById(`toggle-${index}`);
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleButton.textContent = 'Hide';
        } else {
            passwordField.type = 'password';
            toggleButton.textContent = 'Show';
        }
    }

    // Delete a password entry
    window.deletePassword = function (index) {
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        renderPasswords();
    }

    // Save a new password entry
    saveButton.addEventListener('click', () => {
        const website = websiteInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (website && username && password) {
            passwords.push({ website, username, password });
            localStorage.setItem('passwords', JSON.stringify(passwords));
            renderPasswords();

            // Clear input fields after saving
            websiteInput.value = '';
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            alert('Please fill in all fields');
        }
    });

    // Generate and fill a random password
    generateButton.addEventListener('click', () => {
        const newPassword = generateRandomPassword();
        passwordInput.value = newPassword;
    });

    // Generate a strong random password
    function generateRandomPassword(length = 12) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Initial render
    renderPasswords();
});