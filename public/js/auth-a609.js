function toggleAuth(showRegister) {
      const loginForm = document.getElementById('login-interface');
      const registerForm = document.getElementById('register-interface');
      
      if (showRegister) {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
      } else {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
      }
    }

const toast = document.getElementById('toast-notification');
if (toast) {
    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 500);
    }, 4000); // 4000ms = 4 seconds
}