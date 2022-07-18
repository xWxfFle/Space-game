import Component from "./modules/Component.js";
import * as update from "./modules/updateController.js";

let myGamePiece;
const myObstacles = [];
let myScore;
let myBackground;

function startGame() {
  myGameArea.start();
  myGamePiece = new Component(40, 40, "blue", 230, 700);
  myScore = new Component("30px", "Consolas", "black", 280, 40, "text");
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
  if (component.type == "image") {
    if (component.y == -component.height) {
      component.y = 0;
    }
  } else {
    hitBorder(component);
  }
}

function hitBorder(component) {
  const bottomBorder = myGameArea.canvas.height - component.height;
  const topBorder = 0;
  const leftBorder = 0;
  const rightBorder = myGameArea.canvas.width - component.width;
  if (component.y > bottomBorder) {
    component.y = bottomBorder;
  }
  if (component.y < topBorder) {
    component.y = topBorder;
  }
  if (component.x > rightBorder) {
    component.x = leftBorder;
  }
    if (component.x < leftBorder) {
      component.x = rightBorder;
    }
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
  let x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(height, 10, "green", 0, 0));
    myObstacles.push(
      new Component(x - height - gap, 10, "green", 0, height + gap)
    );
  }

  for (let i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 1;
    update.component(myObstacles[i], myGameArea.context);
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  if (myGameArea.keys && myGameArea.keys[37]) {
    myGamePiece.speedX = -1;
  }
  if (myGameArea.keys && myGameArea.keys[39]) {
    myGamePiece.speedX = 1;
  }
  if (myGameArea.keys && myGameArea.keys[38]) {
    myGamePiece.speedY = -1;
  }
  if (myGameArea.keys && myGameArea.keys[40]) {
    myGamePiece.speedY = 1;
  }
  update.component(myScore, myGameArea.context);
  newPos(myGamePiece);
  update.component(myGamePiece, myGameArea.context);
  myBackground.speedY = 1;
  //newPos(myBackground);
  //update(myBackground, myGameArea.context);
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

startGame();
