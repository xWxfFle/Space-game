import { Player, Text } from "./Component.js";
var Renderer = /** @class */ (function () {
    function Renderer(canvas) {
        this.context = canvas.getContext("2d");
    }
    Renderer.prototype.draw = function (component) {
        var _this = this;
        if (component instanceof Text) {
            this.context.font = component.fontSize + " " + component.fontName;
            this.context.fillStyle = component.color;
            this.context.fillText(component.text, component.x, component.y);
        }
        else if (component instanceof Player) {
            this.context.drawImage(component.image, component.x, component.y, component.width, component.height);
        }
        else {
            component.forEach(function (element) {
                _this.context.drawImage(element.image, element.x, element.y, element.width, element.height);
            });
        }
    };
    return Renderer;
}());
export default Renderer;
