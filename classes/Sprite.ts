import { TileCoordinate } from '../models/TileCoordinate';
import Object2D from './Object2D';
import { Point2D } from './primitives/Point2D';

export class Sprite extends Object2D {
  public width: number;
  public height: number;
  public tileWidth: number;
  public tileHeight: number;
  private _context: CanvasRenderingContext2D;
  public mesh: Point2D[] = [];
  public size: number;
  private currentTileIndex: number = 0;
  private _rad: number = 0;
  public displayHitBox: boolean = true;
  private _tilesMap: TileCoordinate[] = [];
  private _atlas: HTMLImageElement;
  private _elapsedAnimetionTime: number = 0;
  private _defaultAnimationTimeDelay: number = 200;

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
    atlas: string
  ) {
    super();
    this._context = context;
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth || width;
    this.tileHeight = tileHeight || height;
    this._createFrameFromAtlas(atlas);
  }

  private _createFrameFromAtlas(paths: string): void {
    this._atlas = new Image();
    this._atlas.src = paths;
    this._populateTileMap(this._atlas);
  }

  private _isAtlasColumnsOrRowsOriented(): boolean {
    return (
      this.tileWidth < this._atlas.naturalWidth ||
      this.tileHeight < this._atlas.naturalHeight
    );
  }

  private _populateTileMap(atlas: HTMLImageElement) {
    if (this._isAtlasColumnsOrRowsOriented) {
      for (let i = 0; i < atlas.naturalWidth / this.tileWidth; i++) {
        for (let j = 0; j < atlas.naturalHeight / this.tileHeight; j++) {
          this._tilesMap.push({
            x: this.tileWidth * i,
            y: this.tileHeight * j,
          });
        }
      }
      return;
    }

    this._tilesMap[0] = this._atlas;
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
    this.drawTile(this.currentTileIndex);
    return;
  }

  /**
   * @description Draw the Sprite to its context.
   * @function
   * @param {CanvasImageSource} asset - Asset to be rendered, a local image or a image url.
   * @private
   * @returns void
   */
  public drawTile(tileIndex: number): void {
    if (this.isRotated) {
      this._context.translate(this.X, this.Y);
      this._context.rotate(this._rad);
      this._context.translate(-this.X, -this.Y);
      this._context.drawImage(
        this._atlas,
        this._tilesMap[tileIndex]?.x,
        this._tilesMap[tileIndex]?.y,
        this.tileWidth,
        this.tileHeight,
        this.X - this.width / 2,
        this.Y - this.height / 2,
        this.width,
        this.height
      );
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }
    this._context.drawImage(
      this._atlas,
      this._tilesMap[tileIndex]?.x,
      this._tilesMap[tileIndex]?.y,
      this.tileWidth,
      this.tileHeight,
      this.X - this.width / 2,
      this.Y - this.height / 2,
      this.width,
      this.height
    );
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

  public animate(
    deltaTime: number,
    frameTime: number | number[] = this._defaultAnimationTimeDelay,
  ){
    let timeLimit = frameTime;
    if(Array.isArray(frameTime)){
      timeLimit = frameTime[this.currentTileIndex] || this._defaultAnimationTimeDelay;
    }
    this._elapsedAnimetionTime += deltaTime;
    if( this._elapsedAnimetionTime >= timeLimit){
      this.nextTile();
      this._elapsedAnimetionTime = 0;
    }
    return;
  };

  public nextTile(){
    if(!!this._tilesMap[this.currentTileIndex + 1]){
      return this.currentTileIndex++;
    }
    return this.currentTileIndex = 0;
  }


}
