var canvas;
var fps = 60;

var paddleSpeed = 5;
var maxPaddleSpeed = 50;

var mover = null;
var moverLatency = 10;

var playing = null;
var timing = null;
var maxTime = 0.0;

var context; 
var canvasHeight = 500;
var canvasWidth = 500;

var bestTime = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

var currentTime = {
  hours: 0,
  minutes: 0,
  seconds: 0
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

var initializeControls = function() {
  document.onkeydown = function(e) {
    if (e.keyCode == 32 && !playing && !timing) {
      playing = setInterval(gameplay, 1000 / fps );
      document.querySelector('#stopwatch').innerHTML = '00:00:00';
      timing = setInterval(gameTimer, 1000);
    }
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

var initializeGame = function() {
  var angle = Math.random() * 2.0 * Math.PI;
  pongBall.x = canvasWidth / 2;
  pongBall.y = canvasHeight / 2;
  pongBall.dx = 11.0 * Math.sin(angle);
  pongBall.dy = 11.0 * Math.cos(angle); 

  leftPaddle.x = 20;
  leftPaddle.y = canvasHeight / 2;

  rightPaddle.x = canvasWidth - 20;
  rightPaddle.y = canvasHeight / 2;
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

var gameTimer = function() {
  currentTime.seconds += 1.0;
  if (currentTime.seconds == 60.0) {
    currentTime.seconds = 0.0;
    currentTime.minutes += 1.0;
  }
  if (currentTime.minutes == 60.0) {
    currentTime.minutes = 0.0;
    currentTime.hours += 1.0;
  }
  var sw = document.querySelector('#stopwatch');
  sw.innerHTML = '';
  currentTime.hours < 10.0 ? sw.innerHTML += '0' : null;
  sw.innerHTML += Math.floor(currentTime.hours);
  sw.innerHTML += ':';
  currentTime.minutes < 10.0 ? sw.innerHTML += '0' : null;
  sw.innerHTML += Math.floor(currentTime.minutes);
  sw.innerHTML += ':';
  currentTime.seconds < 10.0 ? sw.innerHTML += '0' : null;
  sw.innerHTML += Math.floor(currentTime.seconds);
}

var resetGame = function() {
  clearInterval(playing);
  clearInterval(timing);
  var ct = currentTime.seconds + currentTime.minutes*60.0 + currentTime.hours*3600.0;
  var bt = bestTime.seconds + bestTime.minutes*60.0 + bestTime.hours*3600.0;
  if (ct > bt) {
    window.alert('New Best Time!');
    document.querySelector('#bestTime').innerHTML = document.querySelector('#stopwatch').innerHTML;
    bestTime.seconds = currentTime.seconds;
    bestTime.minutes = currentTime.minutes;
    bestTime.hours = currentTime.hours;
  }
  currentTime.seconds = 0.0;
  currentTime.minutes = 0.0;
  currentTime.hours = 0.0;
  playing = null;
  timing = null;
  initializeGame();
}

var gameplay = function () {

  // update right paddle
  if ( rightPaddle.y + rightPaddle.height / 2 + pongBall.dy < canvasHeight && rightPaddle.y - rightPaddle.height / 2 + pongBall.dy > 0 )
  {
    rightPaddle.y += pongBall.dy; 
  }

  // move ball
  pongBall.x += pongBall.dx;
  pongBall.y += pongBall.dy;

  // Hit the Computer Wall
  if (pongBall.x + pongBall.rad >= canvasWidth
      && (pongBall.y > rightPaddle.y + rightPaddle.height/2 + pongBall.rad
      || pongBall.y < rightPaddle.y - rightPaddle.height/2 - pongBall.rad))
  {
    pongBall.dy = pongBall.dy;
    pongBall.dx = -pongBall.dx;
  }

  // Hit the User Wall
  if (pongBall.x - pongBall.rad <= 0
      && (pongBall.y > leftPaddle.y + leftPaddle.height/2 + pongBall.rad
      || pongBall.y < leftPaddle.y - leftPaddle.height/2 - pongBall.rad))
  {
    resetGame();
  }

  // Hit the Computer Paddle
  if (pongBall.x + pongBall.rad >= rightPaddle.x - rightPaddle.width 
      && pongBall.y < rightPaddle.y + rightPaddle.height/2 + pongBall.rad
      && pongBall.y > rightPaddle.y - rightPaddle.height/2 - pongBall.rad)
  {
    pongBall.dy = pongBall.dy;
    pongBall.dx = -pongBall.dx;
  }

  // Hit the User Paddle
  if (pongBall.x - pongBall.rad <= leftPaddle.x+leftPaddle.width 
      && pongBall.y < leftPaddle.y + leftPaddle.height/2 + pongBall.rad
      && pongBall.y > leftPaddle.y - leftPaddle.height/2 - pongBall.rad)
  {
    // Maintain Same Magnitude of Velocity
    var mag = Math.sqrt(pongBall.dy*pongBall.dy + pongBall.dx*pongBall.dx);
    pongBall.dy = mag * ((pongBall.y - leftPaddle.y) / ((leftPaddle.height+2*pongBall.rad) * 0.5));
    pongBall.dx = (Math.sqrt(mag*mag - pongBall.dy*pongBall.dy));
  }

  // Hit top or bottom walls
  if( pongBall.y + pongBall.rad >= canvasHeight || pongBall.y - pongBall.rad <= 0 ) {
    pongBall.dy = -pongBall.dy;
  }

  // redraw
  draw();
}

window.onload = function() {
  initializeControls();
  initializeCanvas();
  initializeGame();
}
