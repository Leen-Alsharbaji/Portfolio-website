let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  
  // Calculate scroll percentage (0 to 1)
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = currentScrollY / scrollHeight;
  
  // Update background position based on scroll
  document.body.style.backgroundPosition = `top ${scrollPercent * 100}%`;
  
  lastScrollY = currentScrollY;
});