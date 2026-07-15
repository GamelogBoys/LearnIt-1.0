document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const navLinks = mobileMenu.querySelectorAll('a');

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    
    // Toggle mobile dropdown visibility
    mobileMenu.classList.toggle('hidden');
    
    // Update aria attribute for screen readers
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle active icon visible state
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  }

  // Bind toggle action to button click
  menuBtn.addEventListener('click', toggleMenu);

  // Auto-close menu drawer when any target destination is selected
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });
});
