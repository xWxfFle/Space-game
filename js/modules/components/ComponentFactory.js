import { Player, Text, Obstacle } from "./Component.js";
var ComponentFactory = /** @class */ (function () {
    function ComponentFactory(canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }
    ComponentFactory.prototype.createPlayer = function () {
        return new Player(230, 700, 75, 60, "files/img/spaceship.png", "files/img/shielded.png", this.canvasWidth, this.canvasHeight);
    };
    ComponentFactory.prototype.createText = function (x, y) {
        return new Text("30px", "Lucida Console", "white", x, y);
    };
    ComponentFactory.prototype.creacteAsteroid = function () {
        var asteroidsImages = [
            "files/img/asteroid-1.png",
            "files/img/asteroid-2.png",
            "files/img/asteroid-3.png",
        ];
        var image = asteroidsImages[Math.floor(Math.random() * asteroidsImages.length)];
        var size = 70;
        var x = Math.floor(Math.random() * (this.canvasWidth - size));
        return new Obstacle(x, -size, size, size, image, "files/img/exp.png", "asteroid");
    };
    ComponentFactory.prototype.createShield = function () {
        var size = 70;
        var x = Math.floor(Math.random() * (this.canvasWidth - size));
        return new Obstacle(x, -size, size, size, "files/img/shield.png", "files/img/exp.png", "shield");
    };
    return ComponentFactory;
}());
export default ComponentFactory;
