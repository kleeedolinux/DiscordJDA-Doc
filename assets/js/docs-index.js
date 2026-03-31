// Documentation index loader
(function() {
  // Highlight current page in sidebar
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.sidebar a');
  
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        currentPath.includes(link.getAttribute('href').replace(/\/$/, ''))) {
      link.classList.add('current');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
