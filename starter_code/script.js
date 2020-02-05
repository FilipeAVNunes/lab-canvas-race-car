window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };
};

//------------ CONSTANTS-------------
const $canvas = document.querySelector('canvas');
const context = $canvas.getContext('2d');
const width = $canvas.width;
const height = $canvas.height;

const CAR_WIDTH = 70;
const CAR_HEITH = 120;
//------------ VARIABLES
let carX = 450;
let carY = 450;

let gameIsRunning = true;
// ----------------------------------- BOARD ---------------------------
function drawBoard() {
  //GRASS
  context.beginPath();
  context.fillStyle = 'green';
  context.fillRect(0, 0, 400, 600);
  context.closePath();
  // road
  context.beginPath();
  context.fillStyle = 'darkgray';
  context.fillRect(24, 0, 352, 600);
  context.closePath();
  //white lines
  context.beginPath();
  context.lineWidth = 5;
  context.strokeStyle = 'white';
  context.setLineDash([]);
  context.moveTo(35, 0);
  context.lineTo(35, 700);
  context.moveTo(365, 0);
  context.lineTo(365, 700);
  context.stroke();
  context.closePath();

  //dashed line
  context.beginPath();
  context.setLineDash([15, 15]);
  context.moveTo(210, 700);
  context.lineTo(210, 0);
  context.stroke();
  context.closePath();
}

// ----------------- CLASSES ------------------------

class Car {
  constructor(x) {
    this.x = x;
  }

  moveLeft(left) {
    this.x -= 10;
    if (this.x < 35) {
      this.x += 10;
    }
  }

  moveRight(right) {
    this.x += 10;
    if (this.x > 295) {
      this.x -= 10;
    }
  }

  drawCar() {
    const carImageSrc = '/starter_code/images/car.png';
    const carImage = new Image();
    carImage.src = carImageSrc;

    carImage.addEventListener('load', () => {
      context.drawImage(carImage, vehicle.x, carY, CAR_WIDTH, CAR_HEITH);
    });

    context.drawImage(carImage, vehicle.x, carY, CAR_WIDTH, CAR_HEITH);
  }
}

const vehicle = new Car(100, 100);

class Obstacle {
  constructor(positionY) {
    this.positionX = 10;
    this.positionY = positionY;
    this.height = 20;
    this.width = 0;

    this.setRandomPosition();
  }
  setRandomPosition() {
    this.positionY = Math.random() * 200;
    this.width = 100 + Math.random() * 100;
    this.x = 35 + Math.random() * 130;
  }
  drawObstacle() {
    context.fillStyle = 'black';
    context.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
  runLogic() {
    this.positionY += 100;
  }

  paint() {
    context.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}

const obstacles = [];

function createObstacle() {
  for (let i = 0; i < 100; i++) {
    const obstacle = new Obstacle(200 + i * 250);
    obstacle.drawObstacle();
    obstacles.push(obstacle);
  }
}

const runLogic = () => {
  for (let obstacle of obstacles) {
    obstacle.runLogic();
  }
};

const cleanCanvas = () => {
  context.clearRect(0, 0, context.$canvas.width, context.$canvas.height);
};

const paint = () => {
  cleanCanvas();

  vehicle.paint();

  for (let obstacle of obstacles) {
    obstacle.paint();
  }
};

//---------------------------------- Arrow keys!---------------
window.addEventListener('keydown', event => {
  event.preventDefault();
  switch (event.keyCode) {
    case 37:
      vehicle.moveLeft();
      console.log('left');
      startGame();
      break;
    case 39:
      vehicle.moveRight();
      console.log('right');
      startGame();
      break;
  }
});

const loop = timestamp => {
  runLogic();
  drawBoard();
  vehicle.drawCar();
  createObstacle();
  if (gameIsRunning) {
    window.requestAnimationFrame(loop);
  }
};

function startGame() {
  loop();
}
