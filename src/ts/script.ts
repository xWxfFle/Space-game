import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/components/ComponentFactory.js";
import Renderer from "./modules/components/ComponentRenderer.js";

const canvas = document.getElementById("game-layer") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const factory = new ComponentFactory(canvas);

function startGame() {
  let frameNo = 0;
  const obstacles: Array<any> = [];
  const player = factory.createPlayer();
  const scoreBar = factory.createText(280, 50);

  const healthContainer = ["🤍", "🤍", "🤍"];
  const healthBar = factory.createText(40, 50);
  const directions = {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
  };
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        directions.ArrowLeft = true;
        break;
      case "ArrowUp":
        directions.ArrowUp = true;
        break;
      case "ArrowDown":
        directions.ArrowDown = true;
        break;
      case "ArrowRight":
        directions.ArrowRight = true;
        break;
      default:
        return;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        directions.ArrowLeft = false;
        break;
      case "ArrowUp":
        directions.ArrowUp = false;
        break;
      case "ArrowDown":
        directions.ArrowDown = false;
        break;
      case "ArrowRight":
        directions.ArrowRight = false;
        break;
      default:
        return;
    }
  });
  const interval = setInterval(updateGameArea, 10);

  let speedModificator = 0;
  let spawnModificator = 0;

  function updateGameArea() {
    //Wiping canvas
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    frameNo += 1;

    obstacles.forEach((element: any, index) => {
      if (element.y > canvas.height) {
        obstacles.splice(index, 1);
      }

      if (crashWith(player, element)) {
        if (element.type === "shield") {
          player.activateShield;
          obstacles.splice(index, 1);
        } else {
          if (player.shield) {
            obstacles.splice(index, 1);
          } else if (healthContainer.length) {
            obstacles.splice(index, 1);
            healthContainer.pop();
          } else {
            clearInterval(interval);
          }
        }
      }
      element.y += 1 + speedModificator;
    });

    if ((frameNo / (120 - spawnModificator)) % 1 == 0) {
      speedModificator < 3 ? (speedModificator += 0.1) : "";
      spawnModificator < 100 ? (spawnModificator += 2) : "";
      obstacles.push(factory.createObstacle("asteroid"));
    }
    if ((frameNo / 1000) % 1 == 0) {
      obstacles.push(factory.createObstacle("shield"));
    }

    if (directions.ArrowLeft) {
      player.speedX = -4;
    }
    if (directions.ArrowRight) {
      player.speedX = 4;
    }
    if (directions.ArrowUp) {
      player.speedY = -4;
    }
    if (directions.ArrowDown) {
      player.speedY = 4;
    }

    //rendering all components
    renderer.draw(obstacles);

    scoreBar.text = "SCORE: " + frameNo;
    renderer.draw(scoreBar);

    healthBar.text = healthContainer.join(" ");
    renderer.draw(healthBar);

    player.newPosition;
    renderer.draw(player);
  }
}
startGame();
