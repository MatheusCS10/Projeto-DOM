document.addEventListener('DOMContentLoaded', () => {
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = togglePasswordButton.querySelector('i');

    // Alternar visibilidade da senha ao clicar no botão
    togglePasswordButton.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'password';
        passwordInput.type = isPasswordVisible ? 'text' : 'password';

        // Alterna o ícone
        togglePasswordIcon.classList.toggle('fa-eye');
        togglePasswordIcon.classList.toggle('fa-eye-slash');
    });
});
