const carousel = document.querySelector('#myCarousel');
let gradientRight = true;

carousel.addEventListener('slide.bs.carousel', () => {
  document.body.classList.toggle('gradient-left', !gradientRight);
  document.body.classList.toggle('gradient-right', gradientRight);
  gradientRight = !gradientRight;
});
