import Updater from "./modules/controllers/updateController.js"
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/ComponentFactory.js";
let player, myScore, interval, frameNo;
const canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 720;
const keys = [];
const myObstacles = [];
const updater = new Updater(canvas);
const factory = new ComponentFactory(canvas);
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
  player = factory.create("player");
  myScore = factory.create("text");
}
function updateGameArea() {
  //Wiping canvas
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  
  frameNo += 1;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myObstacles[i].y > canvas.height) {
      myObstacles.splice(i, 1);
    }
    if (crashWith(player, myObstacles[i])) {
      clearInterval(interval);
    }
    myObstacles[i].y += 1;
    updater.update(myObstacles[i])
  }
  if ((frameNo / 120) % 1 == 0) {
    myObstacles.push(factory.create("asteroid"));
  }
  if ((frameNo / 1000) % 1 == 0) {
    myObstacles.push(factory.create("booster"));
  }
  myScore.text = "SCORE: " + frameNo;
  updater.update(myScore)
  player.newPosition;
  updater.update(player);

  if (keys && keys[37]) {
    player.speedX = -2;
  }
  if (keys && keys[39]) {
    player.speedX = 2;
  }
  if (keys && keys[38]) {
    player.speedY = -2;
  }
  if (keys && keys[40]) {
    player.speedY = 2;
  }
}
startGame();
