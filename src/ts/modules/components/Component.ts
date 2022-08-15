abstract class Component {
  public image = new Image();

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public imageDefault: string,
    public imageAlternative: string
  ) {
    this.image.src = this.imageDefault;
  }
}

export class Obstacle extends Component {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageDefault: string,
    imageAlternative: string,
    public type: "asteroid" | "shield"
  ) {
    super(x, y, width, height, imageDefault, imageAlternative);
  }
}
export class Player extends Component {
  speedX: number = 0;
  speedY: number = 0;
  public shield: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageDefault: string,
    imageAlternative: string,

    private canvasWidth: number,
    private canvasHeight: number
  ) {
    super(x, y, width, height, imageDefault, imageAlternative);
  }
  get activateShield() {
    this.image.src = this.imageAlternative;
    this.shield = true;

    setTimeout(() => {
      this.shield = false;
      this.image.src = this.imageDefault;
    }, 7000);

    return;
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

    return;
  }
}

export class Text {
  public text: string;
  constructor(
    public fontSize: string,
    public fontName: string,
    public color: string,
    public x: any,
    public y: any
  ) {}
}
