var i = 0;
var txt = 'Hey there! What brings you here? Either way, welcome. Wanna see some cool stuff? Go ahead—click around, you might just like what you find.'; /* The text to type */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  var typewriterElem = document.getElementById("typewriter");
  if (typewriterElem && i < txt.length) {
    typewriterElem.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();