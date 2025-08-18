function typeWriter(elemId, speed = 65) {
  let element = document.getElementById(elemId);
  if (!element) return;

  let txt = element.innerHTML; 
  element.innerHTML = ""; 
  let i = 0;

  function typing() {
    if (i < txt.length) {
      element.innerHTML = txt.substring(0, i) + '|';
      i++;
      setTimeout(typing, speed);
    } else {
      element.innerHTML = txt; 
    }
  }

  typing();
}


typeWriter("typewriter", 55);