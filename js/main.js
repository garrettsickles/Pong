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
  dx: 1,
  dy: 1,
  rad: 10,
  x: canvasWidth / 2,
  y: canvasHeight / 2
}

var leftPaddle = { 
  x: 20,
  y: canvasHeight / 2
}

var rightPaddle = {
  x: canvasWidth - 20,
  y: canvasHeight / 2
}

var draw = function () {
  // clear the board
  context.clearRect(0,0,canvasWidth, canvasHeight);
  // initialize graphics properties
  context.beginPath();
  context.strokeStyle = "white";

  // draw paddles and ball
  var height = 100;
  var width = 10;

  context.rect(rightPaddle.x, rightPaddle.y-height/2, width, height);
  context.stroke();
  context.closePath();
  // draw ball
  context.beginPath();
  context.arc(pongBall.x,pongBall.y,10,0,2*Math.PI);
  context.stroke();
  context.closePath();
}

var update = function () {
  // update left paddle

  // update right paddle
  rightPaddle.y += pongBall.dy; 
  
  // move ball
  pongBall.x += pongBall.dx;
  pongBall.y += pongBall.dy;
  if( pongBall.x + pongBall.rad >= canvasWidth
    || pongBall.x - pongBall.rad <= 0 
    || pongBall.x + pongBall.rad >= rightPaddle.x ) pongBall.dx = -pongBall.dx;
  if( pongBall.y + pongBall.rad >= canvasHeight || pongBall.y - pongBall.rad <= 0 ) pongBall.dy = -pongBall.dy;
  // redraw
  draw();
}

window.onload = function() {
  initialize_canvas();
  setInterval(update, 1000 / fps );
}
