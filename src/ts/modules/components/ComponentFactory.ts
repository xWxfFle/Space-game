import { Player, Text, Obstacle } from "./Component.js";

export default class ComponentFactory {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  createPlayer() {
    return new Player(
      230,
      700,
      75,
      60,
      "files/img/spaceship.png",
      "files/img/shielded.png",
      this.canvasWidth,
      this.canvasHeight
    );
  }

  createText(x: number, y: number) {
    return new Text("30px", "Lucida Console", "white", x, y);
  }

  creacteAsteroid() {
    const asteroidsImages = [
      "files/img/asteroid-1.png",
      "files/img/asteroid-2.png",
      "files/img/asteroid-3.png",
    ];
    const image =
      asteroidsImages[Math.floor(Math.random() * asteroidsImages.length)];
    const size = 70;
    const x = Math.floor(Math.random() * (this.canvasWidth - size));
    return new Obstacle(
      x,
      -size,
      size,
      size,
      image,
      "files/img/exp.png",
      "asteroid"
    );
  }

  createShield() {
    const size = 70;
    const x = Math.floor(Math.random() * (this.canvasWidth - size));
    return new Obstacle(
      x,
      -size,
      size,
      size,
      "files/img/shield.png",
      "files/img/exp.png",
      "shield"
    );
  }
}
