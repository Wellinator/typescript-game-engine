import Object2D from './Object2D';
import { Point2D } from './primitives/Point2D';

export class Sprite extends Object2D {
  private _context: CanvasRenderingContext2D;
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;
  public width: number;
  public height: number;
  private assets: CanvasImageSource[] = [];
  private _rad: number = 0;
  private _collidable: boolean = true;
  public displayHitBox: boolean = true;
  public hitBoxColor: string = '#03FC1C';
  private _hasCollided: boolean = false;

  /**
   * Create a new Sprite.
   * @constructor
   * @param {striCanvasRenderingContext2Dng} context - Canvas context.
   * @param {number} X - X axis position.
   * @param {number} Y - Y axis position.
   * @param {number} width - Sprite width.
   * @param {number} height - Sprite height.
   * @param {string} imagePath  - Relative path to sprite image assets.
   */
  constructor(
    context: CanvasRenderingContext2D,
    X: number,
    Y: number,
    width: number,
    height: number,
    imagePath: string | string[]
  ) {
    super();
    this._context = context;
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    this._createSpritesFromPaths(imagePath);
    this.mesh = [
      new Point2D(X - width / 2, Y - height / 2),
      new Point2D(X + width / 2, Y - height / 2),
      new Point2D(X + width / 2, Y + height / 2),
      new Point2D(X - width / 2, Y + height / 2)
    ];
  }

  /**
   * Generate images from paths.
   * @private
   * @param {striCanvasRenderingContext2Dng} context - Canvas context.
   * @param {number} X - X axis position.
   * @param {number} Y - Y axis position.
   * @param {number} width - Sprite width.
   * @param {number} height - Sprite height.
   * @param {string} imagePath  - Relative path to sprite image assets.
   */  
  private _createSpritesFromPaths(paths: string | string[]): void {
    if (Array.isArray(paths)) {
      paths.forEach(path => {
        if (!!path && !!path.length) {
          const tempImage = new Image();
          tempImage.src = path;
          this.assets.push(tempImage);
        }
      });
      return;
    }
    const tempImage = new Image();
    tempImage.src = paths;
    this.assets.push(tempImage);
  }

  draw(context: CanvasRenderingContext2D): ThisType<Sprite> {
    if (!!this.assets.length) {
      this.assets.forEach(asset => this._drawImage(asset));
    }
    if (this.isCollidable && this.displayHitBox) {
      context.save();
      context.strokeStyle = this.hitBoxColor;
      context.beginPath();
      context.moveTo(this.mesh[0].X, this.mesh[0].Y);
      context.lineTo(this.mesh[1].X, this.mesh[1].Y);
      context.lineTo(this.mesh[2].X, this.mesh[2].Y);
      context.lineTo(this.mesh[3].X, this.mesh[3].Y);
      context.closePath();
      context.stroke();
      context.restore();
    }
    return;
  }

  private _drawImage(asset: CanvasImageSource) {
    if (this.isRotated) {
      this._context.translate(this.X, this.Y);
      this._context.rotate(this._rad);
      this._context.translate(-this.X, -this.Y);
      this._context.drawImage(
        asset,
        this.X - this.width / 2,
        this.Y - this.height / 2,
        this.width,
        this.height
      );
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }
    this._context.drawImage(
      asset,
      this.X - this.width / 2,
      this.Y - this.height / 2,
      this.width,
      this.height
    );
  }

  public rotateClockWise(angle = 0): Object2D {
    this._rad += (angle * Math.PI) / 180;
    if (this.isCollidable) {
      this._calculateHitBoxByAngle(angle);
    }
    return this;
  }

  private _calculateHitBoxByAngle(angle: number): void {
    super.rotateClockWise(angle);
  }

  public get isRotated(): boolean {
    return this._rad !== 0;
  }

  get isCollidable(): boolean {
    return this._collidable;
  }

  set collidable(value: boolean) {
    this._collidable = value;
  }

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  private _OnCillide(): void {
    this._hasCollided = true;
    this.hitBoxColor = '#F54242';
    this.OnCollide();
  }

  public OnCollide() {
    return;
  }

  private _checkCollision(): boolean {
    // TODO -> Check colisions between objects and update state;
    return false;
  }

  public scale(scalingFactor: number): void {
    this.width *= scalingFactor;
    this.height *= scalingFactor;
  }

  public scaleX(scalingFactor: number){
    this.width *= scalingFactor;
  }

  public scaleY(scalingFactor: number){
    this.height *= scalingFactor;
  }
}
