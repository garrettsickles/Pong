var canvas;
var context; 

var initialize_canvas = function() {
  canvas = document.getElementById("game");
  canvas.style.backgroundColor = "black";
  canvas.width = 500;
  canvas.height = 500;
  context = canvas.getContext('2d');
} 
  

window.onload = function() {
  initialize_canvas();
}
