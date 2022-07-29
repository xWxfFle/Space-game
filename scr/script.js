import * as update from "./modules/controllers/updateController.js";
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/ComponentFactory.js";
let myGamePiece, myScore, context, interval, frameNo;
const canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 720;
context = canvas.getContext("2d");
const keys = [];
const myObstacles = [];
const factory = new ComponentFactory(canvas);
let speedMultiplyer = 0.5
function startGame() {
  frameNo = 0;
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  interval = setInterval(updateGameArea, 15);
  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  myGamePiece = factory.create("player");
  myScore = factory.create("text");
}
function updateGameArea() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  speedMultiplyer += 0.001
  
  frameNo += 1;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myObstacles[i].y > canvas.height) {
      myObstacles.splice(i, 1);
    }
    if (crashWith(myGamePiece, myObstacles[i])) {
      clearInterval(interval);
    }
    myObstacles[i].y += speedMultiplyer;
    update.image(myObstacles[i], context);
  }
  if ((frameNo / 120) % 1 == 0) {
    myObstacles.push(factory.create("asteroid"));
  }
  if ((frameNo / 1000) % 1 == 0) {
    myObstacles.push(factory.create("booster"));
  }
  myScore.text = "SCORE: " + frameNo;
  update.text(myScore, context);
  myGamePiece.newPosition;
  update.image(myGamePiece, context);

  if (keys && keys[37]) {
    myGamePiece.speedX = -2;
  }
  if (keys && keys[39]) {
    myGamePiece.speedX = 2;
  }
  if (keys && keys[38]) {
    myGamePiece.speedY = -2;
  }
  if (keys && keys[40]) {
    myGamePiece.speedY = 2;
  }
}
startGame();
