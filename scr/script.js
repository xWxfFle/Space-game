import * as update from "./modules/controllers/updateController.js";
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/ComponentFactory.js";
const factory = new ComponentFactory()

let myGamePiece, myScore, context, interval, frameNo;
const canvas = document.createElement("canvas");
const keys = [];
const myObstacles = [];
function startGame() {
  canvas.width = 600;
  canvas.height = 800;
  context = canvas.getContext("2d");
  frameNo = 0;
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  interval = setInterval(updateGameArea, 20);
  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  myGamePiece = factory.createPlayer();
  console.log(myGamePiece);
  myScore = factory.createText();
}

function updateGameArea() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  frameNo += 1;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myObstacles[i].y > canvas.height) {
      myObstacles.splice(i, 1);
    }
    if (crashWith(myGamePiece, myObstacles[i])) {
      clearInterval(interval);
    }
    myObstacles[i].y += 1;
    update.image(myObstacles[i], context);
  }
  if ((frameNo / 80) % 1 == 0) {
    myObstacles.push(factory.create(canvas.width, "asteroid"));
  }
  myScore.text = "SCORE: " + frameNo;
  update.text(myScore, context);
  myGamePiece.newPosition(canvas);
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