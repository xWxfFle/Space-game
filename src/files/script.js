import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/components/ComponentFactory.js";
import Renderer from "./modules/components/ComponentRenderer.js";

const canvas = document.getElementById("game-layer");
const renderer = new Renderer(canvas);
const factory = new ComponentFactory(canvas);

function startGame() {
  let frameNo = 0;
  const keys = [];
  const obstacles = [];
  const player = factory.create("player");
  const score = factory.create("text");

  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = e.type == "keydown";
  });
  const interval = setInterval(updateGameArea, 15);

  let speedModificator = 0;
  let spawnModificator = 0;

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
      element.y += 1 + speedModificator;
      renderer.draw(element);
    });

    if ((frameNo / (120 - spawnModificator)) % 1 == 0) {
      speedModificator < 3 ? (speedModificator += 0.1) : "";
      spawnModificator < 100 ? (spawnModificator += 2) : "";
      obstacles.push(factory.create("asteroid"));
    }
    if ((frameNo / 1000) % 1 == 0) {
      obstacles.push(factory.create("shield"));
    }
    score.text = "SCORE: " + frameNo;
    renderer.draw(score);
    player.newPosition;
    renderer.draw(player);

    if (keys && keys[37]) {
      player.speedX = -4;
    }
    if (keys && keys[39]) {
      player.speedX = 4;
    }
    if (keys && keys[38]) {
      player.speedY = -4;
    }
    if (keys && keys[40]) {
      player.speedY = 4;
    }
  }
}
startGame();
