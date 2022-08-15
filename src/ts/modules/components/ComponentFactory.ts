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
      50,
      70,
      "/files/img/space3.png",
      "/files/img/shield.png",
      this.canvasWidth,
      this.canvasHeight
    );
  }

  createText() {
    return new Text("30px", "Consolas", "white", 280, 40);
  }

  createObstacle(type: "asteroid" | "shield") {
    const img =
      type === "asteroid" ? "/files/img/ast.png" : "/files/img/coin1.png";
    const size = 70;
    const x = Math.floor(Math.random() * (this.canvasWidth - size));
    return new Obstacle(x, -size, size, size, img, "/files/img/exp.png", type);
  }
}
