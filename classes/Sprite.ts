import { AnimateOptions } from '../models/AnimateOptions';
import Object2D from './Object2D';
import { Point2D } from './primitives/Point2D';
import { Tile } from './Tile';
import { TileMap } from './TileMap';

export class Sprite extends Object2D {
  public width: number;
  public height: number;
  public mesh: Point2D[] = [];
  public size: number;
  public displayHitBox: boolean = true;

  private _rad: number = 0;
  private _context: CanvasRenderingContext2D;
  private _tilesMap: TileMap;
  private _elapsedAnimationTime: number = 0;
  private _defaultAnimationTimeDelay: number = 200;
  private _isJumping: boolean = false

  /**
   * Create a new Sprite.
   * @constructor
   * @param {striCanvasRenderingContext2Dng} context - Canvas context.
   * @param {number} X - X axis position.
   * @param {number} Y - Y axis position.
   * @param {number} width - Sprite width.
   * @param {number} height - Sprite height.
   * @param {string} atlas  - URL or Relative path to sprite atlas source.
   */
  constructor(
    context: CanvasRenderingContext2D,
    X: number,
    Y: number,
    width: number,
    height: number,
    tileWidth: number = undefined,
    tileHeight: number = undefined,
    atlas: string | ArrayBuffer
  ) {
    super();
    this._context = context;
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    this._tilesMap = new TileMap(
      atlas,
      tileWidth || width,
      tileHeight || height
    );
  }

  /**
   * Draw the Sprite to its context.
   * @function
   * @public
   * @returns Sprite
   */
  public draw(): ThisType<Sprite> {
    if (this.isCollidable && this.displayHitBox) {
      this.drawHitBox();
    }
    if (!!this._tilesMap.currentTile) {
      this.drawTile(this._tilesMap.currentTile);
    } else {
      console.warn('Error while drawing the spite');
    }
    return this;
  }

  /**
   * @description Draw the Sprite to its context.
   * @function
   * @param {CanvasImageSource} asset - Asset to be rendered, a local image or a image url.
   * @private
   * @returns void
   */
  public drawTile(tile: Tile): void {
    if (this.isRotated) {
      this._context.translate(this.X, this.Y);
      this._context.rotate(this._rad);
      this._context.translate(-this.X, -this.Y);
    }

    this._context.drawImage(
      tile?.atlas,
      tile?.x,
      tile?.y,
      tile?.width,
      tile?.height,
      this.X - this.width / 2,
      this.Y - this.height / 2,
      this.width,
      this.height
    );

    if (this.isRotated) {
      this.resetContextRotation();
    }
  }

  private resetContextRotation(): ThisType<Sprite> {
    this._context.setTransform(1, 0, 0, 1, 0, 0);
    return this;
  }

  private drawHitBox() {
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
    } else {
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

  public animate(deltaTime: number, options: AnimateOptions = undefined) {
    let timeLimit = options?.customframeTime || this._defaultAnimationTimeDelay;
    if (Array.isArray(options?.customframeTime)) {
      timeLimit =
        options?.customframeTime[options.customTilesMap.tileIndex] ||
        this._tilesMap.tileIndex ||
        this._defaultAnimationTimeDelay;
    }
    this._elapsedAnimationTime += deltaTime;
    if (this._elapsedAnimationTime >= timeLimit) {
      const tileMap = options?.customTilesMap || this._tilesMap;
      if (options?.animateInOpositeDirection || false) {
        tileMap.previousTile();
      } else {
        tileMap.nextTile();
      }

      this._elapsedAnimationTime = 0;
    }
    return;
  }

  public get isJumping(): boolean {
    return this._isJumping;
  }

  public jump(force: number = 1){
    this._isJumping = true;
    this.velocity.setLength(force)
    this.setDirection((3 * Math.PI) / 2);
  }

  public moveUp(speed: number = 1){
    this.setDirection((3 * Math.PI) / 2);
    this.velocity.multipliedBy(speed);
  }
  
  public moveDown(speed: number = 1){
    this.setDirection(Math.PI / 2);
    this.velocity.multipliedBy(speed);
  }

  public moveLeft(speed: number = 1){
    this.setDirection(Math.PI);
    this.velocity.multipliedBy(speed);
  }
  
  public moveRight(speed: number = 1){
    this.setDirection(Math.PI * 2);
    this.velocity.multipliedBy(speed);
  }
}
