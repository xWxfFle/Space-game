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
  constructor(width, height, color, x, y, type) {
    super(width, height, color, x, y, type);
  }
  newPosition(canvas) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX = 0;
    this.speedY = 0;

    this.hitBorder(canvas);
  }

  hitBorder(canvas) {
    const bottomBorder = canvas.height - this.height;
    const topBorder = 0;
    const leftBorder = 0;
    const rightBorder = canvas.width - this.width;

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
  }
}
