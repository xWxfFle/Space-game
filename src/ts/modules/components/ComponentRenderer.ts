import { Player, Text, Obstacle } from "./Component.js";

export default class Renderer {
  private context: any;
  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
  }
  draw(component: Player | Text | Obstacle): void {
    if (component instanceof Text) {
      this.context.font = component.fontSize + " " + component.fontName;
      this.context.fillStyle = component.color;
      this.context.fillText(component.text, component.x, component.y);
    } else {
      this.context.drawImage(
        component.image,
        component.x,
        component.y,
        component.width,
        component.height
      );
    }
  }
}
