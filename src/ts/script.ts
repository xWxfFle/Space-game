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
  const scoreBar = factory.createText(210, 50);

  const healthContainer = ["🤍", "🤍", "🤍"];
  const healthBar = factory.createText(30, 50);
  const directions = {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
  };

  window.addEventListener("keydown", (e) => {
    movementController(e.key, true);
  });
  window.addEventListener("mousedown", (e) => {
    const clickedButton = (e.target as Element).closest("button");
    movementController(clickedButton?.className, true);
  });
  window.addEventListener("touchstart", (e) => {
    const clickedButton = (e.target as Element).closest("button");
    movementController(clickedButton?.className, true);
  });

  window.addEventListener("keyup", (e) => {
    movementController(e.key, false);
  });
  window.addEventListener("mouseup", (e) => {
    const clickedButton = (e.target as Element).closest("button");
    movementController(clickedButton?.className, false);
  });
  window.addEventListener("touchend", (e) => {
    const clickedButton = (e.target as Element).closest("button");
    movementController(clickedButton?.className, false);
  });

  const interval = setInterval(updateGameArea, 10);

  let speedModificator = 0;
  let spawnModificator = 0;

  function updateGameArea() {
    //Wiping canvas
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    frameNo += 1;

    obstacles.forEach((element: any, index) => {
      if (element.y > canvas.height) return obstacles.splice(index, 1);

      if (crashWith(player, element)) {
        obstacles.splice(index, 1);
        if (player.shield) return;
        if (element.type === "shield") return player.activateShield;
        if (healthContainer.length) return healthContainer.pop();
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
startGame();
