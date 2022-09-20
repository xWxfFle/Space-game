var track = document.getElementById("track");
var volume = document.getElementById("volume");
volume.addEventListener("change", function () {
    track.volume = parseInt(volume.value) / 100;
});
import crashWith from "./modules/controllers/crashController.js";
import ComponentFactory from "./modules/components/ComponentFactory.js";
import Renderer from "./modules/components/ComponentRenderer.js";
var startbtn = document.getElementById("start");
var canvas = document.getElementById("game__layer");
var renderer = new Renderer(canvas);
var factory = new ComponentFactory(canvas);
var isGameActive = false;
var isGamePaused = false;
startbtn.addEventListener("click", function () {
    if (!isGameActive) {
        startGame();
        return;
    }
    isGamePaused = !isGamePaused;
});
function startGame() {
    isGameActive = true;
    var frameNo = 0;
    var speedModificator = 0;
    var spawnModificator = 0;
    var player = factory.createPlayer();
    var scoreBar = factory.createText(210, 50);
    var pauseBar = factory.createText(120, 220);
    var healthBar = factory.createText(30, 50);
    var obstacles = [];
    var healthContainer = ["🤍", "🤍", "🤍"];
    var directions = {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
    };
    window.addEventListener("keydown", function (event) {
        movementController(event.key, true);
    });
    window.addEventListener("mousedown", function (event) {
        var clickedButton = event.target.closest("button");
        movementController(clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.className, true);
    });
    window.addEventListener("touchstart", function (event) {
        var clickedButton = event.target.closest("button");
        movementController(clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.className, true);
    });
    window.addEventListener("keyup", function (event) {
        movementController(event.key, false);
    });
    window.addEventListener("mouseup", function (event) {
        var clickedButton = event.target.closest("button");
        movementController(clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.className, false);
    });
    window.addEventListener("touchend", function (event) {
        var clickedButton = event.target.closest("button");
        movementController(clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.className, false);
    });
    var interval = setInterval(updateGameArea, 10);
    function updateGameArea() {
        var _a;
        //Wiping canvas
        (_a = canvas.getContext("2d")) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, canvas.width, canvas.height);
        if (isGamePaused) {
            pauseBar.text = "Game paused";
            renderer.draw(pauseBar);
        }
        else {
            frameNo += 1;
            obstacles.forEach(function (element, index) {
                if (element.y > canvas.height)
                    return obstacles.splice(index, 1);
                if (crashWith(player, element)) {
                    obstacles.splice(index, 1);
                    if (player.shield)
                        return;
                    if (element.type === "shield")
                        return player.activateShield;
                    if (healthContainer.length)
                        return healthContainer.pop();
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
    function movementController(listener, value) {
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
