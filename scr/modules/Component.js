export default class Component {
  constructor(width, height, color, x, y, type) {
    this.color = color;
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    if (this.type == "image") {
      this.image = new Image();
      this.image.src = this.color;
    }
  }
}

export class Player extends Component {
  constructor(width, height, color, x, y, type, canvasWidth, canvasHeight) {
    super(width, height, color, x, y, type);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
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
