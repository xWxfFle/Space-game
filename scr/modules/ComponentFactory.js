import Component, { Player, Text } from "./Components.js";
export default class ComponentFactory {
  constructor(canvas) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  create(type) {
    if (type === "player") {
      return new Player(70, 70, "/scr/img/space3.png", 230, 700, this.canvasWidth ,  this.canvasHeight);
    }
    if (type == "text") {
      return new Text("30px", "Consolas", "white", 280, 40);
    }
    if (type === "asteroid") {
        const size = 70;
        const x = Math.floor(Math.random() * (this.canvasWidth - size));
      return new Component(size, size, "/scr/img/ast.png", x, -size, "asteroid");
    }
    if (type === "booster") {
        const size = 70;
        const x = Math.floor(Math.random() * (this.canvasWidth - size));
      return new Component(size, size, "/scr/img/coin1.png", x, -size, "booster");
    }
  }
}