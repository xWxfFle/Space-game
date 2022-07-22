import Component from "./modules/Component.js";
import * as update from "./modules/controllers/updateController.js";
import crashWith from "./modules/controllers/crashController.js";
import hitBorder from "./modules/controllers/hitBorderController.js";
import createAsteroid from "./modules/createAsteroid.js";

let myGamePiece;
const myObstacles = [];
let myScore;
let myBackground;
function startGame() {
  myGameArea.start();
  myGamePiece = new Component(
    40,
    40,
    "/scr/img/starship.jpg",
    230,
    700,
    "image"
  );
  myScore = new Component("30px", "Consolas", "white", 280, 40, "text");
  myBackground = new Component(
    500,
    800,
    "/scr/img/background.jpg",
    0,
    0,
    "image"
  );
}

function newPos(component) {
  component.x += component.speedX;
  component.y += component.speedY;
  hitBorder(component, myGameArea.canvas);
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 500;
    this.canvas.height = 800;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = e.type == "keydown";
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = e.type == "keydown";
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateGameArea() {
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (crashWith(myGamePiece, myObstacles[i])) {
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;

  if ((myGameArea.frameNo / 80) % 1 == 0) {
    myObstacles.push(new Component(...createAsteroid(myGameArea.canvas.width)));
  }
  
  for (let i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 1;
    update.image(myObstacles[i], myGameArea.context);
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  update.text(myScore, myGameArea.context);
  newPos(myGamePiece);
  update.image(myGamePiece, myGameArea.context);
  myBackground.speedY = 1;
  //newPos(myBackground);
  //update(myBackground, myGameArea.context);
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[37]) {
    myGamePiece.speedX = -2;
  }
  if (myGameArea.keys && myGameArea.keys[39]) {
    myGamePiece.speedX = 2;
  }
  if (myGameArea.keys && myGameArea.keys[38]) {
    myGamePiece.speedY = -2;
  }
  if (myGameArea.keys && myGameArea.keys[40]) {
    myGamePiece.speedY = 2;
  }
}
startGame();
