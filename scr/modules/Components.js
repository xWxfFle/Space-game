export default class Component {
  constructor(width, height, image, x, y, type) {
    this.image = new Image();
    this.image.src = image;
    this.render = "image";
    this.type = type
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
  }
}

export class Player extends Component {
  constructor(width, height, image, x, y, canvasWidth, canvasHeight) {
    super(width, height, image, x, y);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.boosterActivated = false;
  }

  get newPosition() {
    const bottomBorder = this.canvasHeight - this.height;
    const topBorder = 0;
    const leftBorder = 0;
    const rightBorder = this.canvasWidth - this.width;

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
  }
}

export class Text {
  constructor(fontSize, fontName, color, x, y) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.color = color;
    this.render = "text";
    this.x = x;
    this.y = y;
  }
}
