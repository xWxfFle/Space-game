import Component, { Player, Text } from "./Component.js";
export default class ComponentFactory {
  constructor(canvas) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  create(type) {
    if (type === "player") {
      return new Player(50, 70, "/scr/img/space3.png", "/scr/img/shield.png", 230, 700, this.canvasWidth ,  this.canvasHeight);
    }
    if (type == "text") {
      return new Text("30px", "Consolas", "white", 280, 40);
    }
    if (type === "asteroid") {
        const size = 70;
        const x = Math.floor(Math.random() * (this.canvasWidth - size));
      return new Component(size, size, "/scr/img/ast.png", "/scr/img/exp.png", x, -size, "asteroid");
    }
    if (type === "shield") {
        const size = 70;
        const x = Math.floor(Math.random() * (this.canvasWidth - size));
      return new Component(size, size, "/scr/img/coin1.png", "", x, -size, "shield");
    }
  }
}