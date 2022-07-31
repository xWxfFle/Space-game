export default class Updater {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
  }
  update(component) {
    if (component.type === "image") {
      this.context.drawImage(
        component.image,
        component.x,
        component.y,
        component.width,
        component.height
      );
    }
    if (component.type === "text") {
      this.context.font = component.width + " " + component.height;
      this.context.fillStyle = component.color;
      this.context.fillText(component.text, component.x, component.y);
    }
  }
}