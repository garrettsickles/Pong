var canvas;
var fps = 30;
var context; 
var canvasHeight = 500;
var canvasWidth = 500;

var initialize_canvas = function() {
  canvas = document.getElementById("game");
  canvas.style.backgroundColor = "black";
  canvas.width = canvasWidth;
  canvas.height = canvasWidth;
  context = canvas.getContext('2d');
} 
  
var pongBall = {
  dx: 0,
  dy: 0,
  x: canvasWidth / 2,
  y: canvasHeight / 2
}

var leftPaddle = { 
  x: 10,
  y: canvasHeight / 2
}

var rightPaddle = {
  x: canvasWidth - 10,
  y: canvasHeight / 2
}

var draw = function () {
  // draw paddles and ball
  

  // draw ball
  context.beginPath();
  context.strokeStyle = "white";
  context.arc(pongBall.x,pongBall.y,10,0,2*Math.PI);
  context.stroke();
}

var update = function () {
  // check logic
  draw();
}

window.onload = function() {
  initialize_canvas();
  setInterval(update, 1000 / fps );
}
