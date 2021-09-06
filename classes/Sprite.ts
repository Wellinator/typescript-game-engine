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
    this.mesh = [];
  }

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
    return;
  }

  private _drawImage(asset: CanvasImageSource){
    if(this.isRotated){
      this._context.translate(this.X, this.Y);
      this._context.rotate(this._rad);
      this._context.translate(-this.X, -this.Y);
      this._context.drawImage(asset, this.X - this.width / 2, this.Y - this.height/2, this.width, this.height);
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }
    this._context.drawImage(asset, this.X - this.width / 2, this.Y - this.height/2, this.width, this.height);
  }

  public rotateClockWise(angle = 0): Object2D {
    this._rad += (angle * Math.PI) / 180;
    return this;
  }

  public get isRotated(): boolean {
    return this._rad !== 0;
  }
}
