import Object2D from './Object2D';
import { Point2D } from './primitives/Point2D';

export class Sprite extends Object2D {
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;
  public width: number;
  public height: number;
  private assets: CanvasImageSource[] = [];

  constructor(
    X: number,
    Y: number,
    width: number,
    height: number,
    imagePath: string | string[]
  ) {
    super();
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;

    this._createSpritesFromPaths(imagePath);
    this.mesh = [
      new Point2D(X - width, Y - height),
      new Point2D(X + width, Y - height),
      new Point2D(X + width, Y + height),
      new Point2D(X - width, Y + height)
    ];
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
    context.beginPath();
    context.moveTo(this.mesh[0].X, this.mesh[0].Y);
    context.lineTo(this.mesh[1].X, this.mesh[1].Y);
    context.lineTo(this.mesh[2].X, this.mesh[2].Y);
    context.lineTo(this.mesh[3].X, this.mesh[3].Y);
    context.closePath();
    context.stroke();
    if(!!this.assets.length){
      this.assets.forEach( asset => {
        context.drawImage(asset, this.X, this.Y, this.width, this.height);
      })
    }
    return;
  }
}
