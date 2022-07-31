import Update from "./modules/ComponentUpdate.js";
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/ComponentFactory.js";
let player, myScore, interval, frameNo;
const canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 720;
const keys = [];
const myObstacles = [];
const update = new Update(canvas);
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
  myObstacles.forEach((element, index) => {
    if (element.y > canvas.height) {
      myObstacles.splice(index, 1);
    }
    if (crashWith(player, element)) {
      element.type === "booster"
        ? (player.boosterActivated = true)
        : clearInterval(interval);
    }
    element.y += 1;
    update.render(element);
  });
  if ((frameNo / 120) % 1 == 0) {
    myObstacles.push(factory.create("asteroid"));
  }
  if ((frameNo / 1000) % 1 == 0) {
    myObstacles.push(factory.create("booster"));
  }
  myScore.text = "SCORE: " + frameNo;
  update.render(myScore);
  player.newPosition;
  update.render(player);

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
