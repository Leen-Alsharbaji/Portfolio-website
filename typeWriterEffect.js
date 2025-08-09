var i = 0;
var txt = '<strong>Hey there! What brings you here?</strong> Either way, welcome. Wanna see some <strong>cool stuff?</strong> Go ahead—click around, you might just like what you find.';
var speed = 65;

function typeWriter() {
  var typewriterElem = document.getElementById("typewriter");
  if (typewriterElem && i < txt.length) {
    // Display up to the ith character
    typewriterElem.innerHTML = txt.substring(0, i) + '|'; 
    i++;
    setTimeout(typeWriter, speed);
  } else {
    typewriterElem.innerHTML = txt; 
  }
}
typeWriter();
