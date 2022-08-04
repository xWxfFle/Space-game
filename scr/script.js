import Update from "./modules/ComponentUpdate.js";
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/ComponentFactory.js";
function startGame() {
  const canvas = document.createElement("canvas");
  canvas.width = 480;
  canvas.height = 720;
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  let frameNo = 0;
  const interval = setInterval(updateGameArea, 15);
  const keys = [];
  const obstacles = [];
  const update = new Update(canvas);
  const factory = new ComponentFactory(canvas);
  const player = factory.create("player");
  const myScore = factory.create("text");

  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });

  function updateGameArea() {
    //Wiping canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    frameNo += 1;
    obstacles.forEach((element, index) => {
      if (element.y > canvas.height) {
        obstacles.splice(index, 1);
      }
      if (crashWith(player, element)) {
        if (element.type === "shield") {
          player.activateShield;
          obstacles.splice(index, 1);
        } else {
          if (player.shield) {
            element.image.scr = element.imageAlternative;
            obstacles.splice(index, 1);
          } else {
            clearInterval(interval);
          }
        }
      }
      element.y += 1;
      update.render(element);
    });

    if ((frameNo / 120) % 1 == 0) {
      obstacles.push(factory.create("asteroid"));
    }
    if ((frameNo / 1000) % 1 == 0) {
      obstacles.push(factory.create("shield"));
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
}
startGame();
