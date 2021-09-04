import Object2D from './Object2D';
import { Point2D } from './Point2D';

export class Sprite extends Object2D {
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;
  private _backGroundColor: string;
  
  constructor(X: number, Y: number, size: number) {
    super();
    this.X = X;
    this.Y = Y;
    this.size = size;

    this.mesh = [
      new Point2D(X - size, Y - size),
      new Point2D(X + size, Y - size),
      new Point2D(X + size, Y + size),
      new Point2D(X - size, Y + size),
    ]
  }

  draw(context: CanvasRenderingContext2D): ThisType<Sprite>  {
    context.beginPath();
    context.moveTo(this.mesh[0].X, this.mesh[0].Y);
    context.lineTo(this.mesh[1].X, this.mesh[1].Y);
    context.lineTo(this.mesh[2].X, this.mesh[2].Y);
    context.lineTo(this.mesh[3].X, this.mesh[3].Y);
    context.closePath();
    context.stroke();
    return;
  }

  public set backGroundColor(color: string) {
    this._backGroundColor = color;
  }
}
