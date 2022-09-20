var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = /** @class */ (function () {
    function Component(x, y, width, height, imageDefault, imageAlternative) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageDefault = imageDefault;
        this.imageAlternative = imageAlternative;
        this.image = new Image();
        this.image.src = this.imageDefault;
    }
    return Component;
}());
var Obstacle = /** @class */ (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(x, y, width, height, imageDefault, imageAlternative, type) {
        var _this = _super.call(this, x, y, width, height, imageDefault, imageAlternative) || this;
        _this.type = type;
        return _this;
    }
    return Obstacle;
}(Component));
export { Obstacle };
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y, width, height, imageDefault, imageAlternative, canvasWidth, canvasHeight) {
        var _this = _super.call(this, x, y, width, height, imageDefault, imageAlternative) || this;
        _this.canvasWidth = canvasWidth;
        _this.canvasHeight = canvasHeight;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.shield = false;
        return _this;
    }
    Object.defineProperty(Player.prototype, "activateShield", {
        get: function () {
            var _this = this;
            this.image.src = this.imageAlternative;
            this.shield = true;
            setTimeout(function () {
                _this.shield = false;
                _this.image.src = _this.imageDefault;
            }, 7000);
            return;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "newPosition", {
        get: function () {
            var bottomBorder = this.canvasHeight - this.height;
            var topBorder = 0;
            var leftBorder = 0;
            var rightBorder = this.canvasWidth - this.width;
            if (this.y > bottomBorder) {
                this.y = bottomBorder;
            }
            if (this.y < topBorder) {
                this.y = topBorder;
            }
            if (this.x > rightBorder) {
                this.x = leftBorder;
            }
            if (this.x < leftBorder) {
                this.x = rightBorder;
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX = 0;
            this.speedY = 0;
            return;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}(Component));
export { Player };
var Text = /** @class */ (function () {
    function Text(fontSize, fontName, color, x, y) {
        this.fontSize = fontSize;
        this.fontName = fontName;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    return Text;
}());
export { Text };
