import Object2D from './Object2D';
import { Point2D } from './primitives/Point2D';

export class Sprite extends Object2D {
  private _context: CanvasRenderingContext2D;
  public mesh: Point2D[] = [];
  public size: number;
  public width: number;
  public height: number;
  private assets: CanvasImageSource[] = [];
  private _rad: number = 0;
  public displayHitBox: boolean = true;

  /**
   * Create a new Sprite.
   * @constructor
   * @param {striCanvasRenderingContext2Dng} context - Canvas context.
   * @param {number} X - X axis position.
   * @param {number} Y - Y axis position.
   * @param {number} width - Sprite width.
   * @param {number} height - Sprite height.
   * @param {string} imagePath  - URL or Relative path to sprite image assets.
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
  }

  private _createSpritesFromPaths(paths: string | string[]): void {
    if (Array.isArray(paths)) {
      paths.forEach((path) => {
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

  /**
   * Draw the Sprite to its context.
   * @function
   * @public
   * @returns ThisType<Sprite>
   */
  public draw(): ThisType<Sprite> {
    if (this.isCollidable && this.displayHitBox) {
      this.drawHitBox()
    }
    if (!!this.assets.length) {
      this.assets.forEach((asset) => this._drawImage(asset));
    }
    return;
  }

  /**
   * @description Draw the Sprite to its context.
   * @function
   * @param {CanvasImageSource} asset - Asset to be rendered, a local image or a image url.
   * @private
   * @returns void
   */
  private _drawImage(asset: CanvasImageSource): void {
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

  private drawHitBox(){
    this._context.save();
    this._context.lineWidth = 3;
    this._context.strokeStyle = this.hitBoxColor;
    this._context.beginPath();

    if (this.isRotated) {
      this._context.translate(this.X, this.Y);
      this._context.rotate(this._rad);
      this._context.translate(-this.X, -this.Y);
      this._context.rect(
        this.X - this.width / 2,
        this.Y - this.height / 2,
        this.width,
        this.height
      );
      this._context.setTransform(1, 0, 0, 1, 0, 0);
    }else{
      this._context.rect(
        this.X - this.width / 2,
        this.Y - this.height / 2,
        this.width,
        this.height
      );
    }

    this._context.closePath();
    this._context.stroke();
    this._context.restore();
  }

  public rotateClockWise(angle = 0): Object2D {
    this._rad += (angle * Math.PI) / 180;
    return this;
  }

  public rotateCounterClockWise(angle = 0): Object2D {
    this._rad -= (angle * Math.PI) / 180;
    return this;
  }

  public get isRotated(): boolean {
    return this._rad !== 0;
  }

  private _OnCollide(): void {
    this.hasCollided = true;
    this.OnCollide();
  }

  public OnCollide() {
    return;
  }

  private _checkCollision(): boolean {
    // TODO -> Check colisions between objects and update state;
    return false;
  }

  public scale(scalingFactor: number): Object2D {
    this.width *= scalingFactor;
    this.height *= scalingFactor;
    super.scale(scalingFactor);
    return this;
  }

  public scaleX(scalingFactor: number) {
    this.width *= scalingFactor;
  }

  public scaleY(scalingFactor: number) {
    this.height *= scalingFactor;
  }

  public update(deltaTimestamp: number): void {
    this.OnBeforeUpdate();
    this.OnUpdate(deltaTimestamp);
    this.OnAfterUpdate();
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate(deltaTimestamp: number) {
    return;
  }

  public OnAfterUpdate() {
    return;
  }
}
