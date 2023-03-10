import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/components/ComponentFactory.js";
import Renderer from "./modules/components/ComponentRenderer.js";

const startbtn = document.getElementById("start") as HTMLButtonElement;
const canvas = document.getElementById("game__layer") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const factory = new ComponentFactory(canvas);

let isGameActive = false;
let isGamePaused = false;
startbtn.addEventListener("click", () => {
  if (!isGameActive) {
    startGame();
    return;
  }
  isGamePaused = !isGamePaused;
});

function startGame() {
  isGameActive = true;

  let frameNo = 0;
  let speedModificator = 0;
  let spawnModificator = 0;

  const player = factory.createPlayer();
  const scoreBar = factory.createText(210, 50);
  const pauseBar = factory.createText(120, 220);
  const healthBar = factory.createText(30, 50);

  const obstacles: Array<any> = [];
  const healthContainer = ["🤍", "🤍", "🤍"];

  const directions = {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
  };

  window.addEventListener("keydown", (event) => {
    movementController(event.key, true);
  });
  window.addEventListener("mousedown", (event) => {
    const clickedButton = (event.target as Element).closest("button");
    movementController(clickedButton?.className, true);
  });
  window.addEventListener("touchstart", (event) => {
    const clickedButton = (event.target as Element).closest("button");
    movementController(clickedButton?.className, true);
  });

  window.addEventListener("keyup", (event) => {
    movementController(event.key, false);
  });
  window.addEventListener("mouseup", (event) => {
    const clickedButton = (event.target as Element).closest("button");
    movementController(clickedButton?.className, false);
  });
  window.addEventListener("touchend", (event) => {
    const clickedButton = (event.target as Element).closest("button");
    movementController(clickedButton?.className, false);
  });

  const interval = setInterval(updateGameArea, 10);

  function updateGameArea() {
    //Wiping canvas
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

    if (isGamePaused) {
      pauseBar.text = "Game paused";
      renderer.draw(pauseBar);
    } else {
      frameNo += 1;
      obstacles.forEach((element: any, index) => {
        if (element.y > canvas.height) return obstacles.splice(index, 1);

        if (crashWith(player, element)) {
          obstacles.splice(index, 1);
          if (player.shield) return;
          if (element.type === "shield") return player.activateShield;
          if (healthContainer.length) return healthContainer.pop();
          isGameActive = false;
          clearInterval(interval);
        }
        element.y += 1 + speedModificator;
      });

      if ((frameNo / (120 - spawnModificator)) % 1 == 0) {
        speedModificator < 3 ? (speedModificator += 0.1) : "";
        spawnModificator < 100 ? (spawnModificator += 2) : "";
        obstacles.push(factory.creacteAsteroid());
      }
      if ((frameNo / 1000) % 1 == 0) {
        obstacles.push(factory.createShield());
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

  function movementController(listener: string | undefined, value: boolean) {
    switch (listener) {
      case "ArrowLeft":
        directions.ArrowLeft = value;
        break;
      case "ArrowUp":
        directions.ArrowUp = value;
        break;
      case "ArrowDown":
        directions.ArrowDown = value;
        break;
      case "ArrowRight":
        directions.ArrowRight = value;
        break;
      default:
        return;
    }
  }
}
