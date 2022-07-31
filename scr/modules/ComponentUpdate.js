export default class Update {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
  }
  render(component) {
    if (component.render === "image") {
      this.context.drawImage(
        component.image,
        component.x,
        component.y,
        component.width,
        component.height
      );
    }
    if (component.render === "text") {
      this.context.font = component.fontSize + " " + component.fontName;
      this.context.fillStyle = component.color;
      this.context.fillText(component.text, component.x, component.y);
    }
  }
}
