import Component, { Player } from "./Component.js";
export default class ComponentFactory {
  createPlayer() {
    return new Player(40, 40, "/scr/img/starship.jpg", 230, 700, "image");
  }
  createText() {
    return new Component("30px", "Consolas", "white", 280, 40, "text");
  }

  create(containerWidth, type) {
    const size = 40;
    const x = Math.floor(Math.random() * (containerWidth - size));
    if (type === "asteroid") {
      return new Component(size, size, "/scr/img/asteroid.png", x, -size, "image");
    }
    if (type === "booster") {
      return new Component(size, size, "/scr/img/coin.jpg", x, -size, "image");
    }
  }
}