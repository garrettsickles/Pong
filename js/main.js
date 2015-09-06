var canvas;
var fps = 60;

var paddleSpeed = 5;
var maxPaddleSpeed = 50;

var mover;
var moverLatency = 10;

var context; 
var canvasHeight = 500;
var canvasWidth = 500;

var initializeControls = function() {
  document.onkeydown = function(e) {
    if (!mover) {
      if (e.keyCode == 38) {
        mover = setInterval(function() { leftPaddle.y-leftPaddle.height/2 >= 0 ? leftPaddle.y -= paddleSpeed : null;}, moverLatency); 
      } else if (e.keyCode == 40) {
        mover = setInterval(function() {leftPaddle.y+leftPaddle.height/2 <= canvasHeight ? leftPaddle.y += paddleSpeed : null;}, moverLatency); 
      }
    }
  };

  document.onkeyup = function(e) {
    if (mover) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        clearInterval(mover); 
        mover = null;
      }
    }
  }
}

var initializeCanvas = function() {
  canvas = document.getElementById("game");
  canvas.style.backgroundColor = "black";
  canvas.width = canvasWidth;
  canvas.height = canvasWidth;
  context = canvas.getContext('2d');
}

var pongBall = {
  dx: -10,
  dy: -1,
  rad: 10,
  x: canvasWidth / 2,
  y: canvasHeight / 2
}

var leftPaddle = { 
  height: 100,
  width: 10,
  x: 20,
  y: canvasHeight / 2
}

var rightPaddle = {
  x: canvasWidth - 20,
  height: 100,
  width: 10,
  y: canvasHeight / 2
}

var draw = function () {
  // clear the board
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // initialize graphics properties
  context.beginPath();
  context.strokeStyle = "white";

  // draw paddles and ball
  context.rect(leftPaddle.x, leftPaddle.y-leftPaddle.height/2, leftPaddle.width, leftPaddle.height);
  context.fillStyle = 'white';
  context.fill();
  context.stroke();
  context.closePath();

  // draw right paddle
  context.rect(rightPaddle.x, rightPaddle.y-rightPaddle.height/2, rightPaddle.width, rightPaddle.height);
  context.fillStyle = 'white';
  context.fill();
  context.stroke();
  context.closePath();

  // draw ball
  context.beginPath();
  context.arc(pongBall.x, pongBall.y, pongBall.rad, 0, 2*Math.PI);
  context.fillStyle = 'white';
  context.fill();
  context.stroke();
  context.closePath();
}

var update = function () {
  // update left paddle

  // update right paddle
  if ( rightPaddle.y + rightPaddle.height / 2 + pongBall.dy < canvasHeight && rightPaddle.y - rightPaddle.height / 2 + pongBall.dy > 0 ) rightPaddle.y += pongBall.dy; 
  
  // move ball
  pongBall.x += pongBall.dx;
  pongBall.y += pongBall.dy;
  if( pongBall.x + pongBall.rad >= canvasWidth
    || pongBall.x - pongBall.rad <= 0 
    || pongBall.x + pongBall.rad >= rightPaddle.x 
    || (pongBall.x - pongBall.rad <= leftPaddle.x+leftPaddle.width 
      && pongBall.y < leftPaddle.y + leftPaddle.height/2 + pongBall.rad
      && pongBall.y > leftPaddle.y - leftPaddle.height/2 - pongBall.rad))
  {
    pongBall.dx = -pongBall.dx;
    pongBall.dy = pongBall.dy;
  }
  if( pongBall.y + pongBall.rad >= canvasHeight || pongBall.y - pongBall.rad <= 0 ) pongBall.dy = -pongBall.dy;
  // redraw
  draw();
}

window.onload = function() {
  initializeControls();
  initializeCanvas();
  setInterval(update, 1000 / fps );
}
