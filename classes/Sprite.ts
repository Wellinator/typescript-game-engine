import Object2D from './Object2D';
import { Point2D } from './Point2D';

export class Sprite extends Object2D {
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;
  public width: number;
  public height: number
  
  constructor(
    X: number, 
    Y: number, 
    width: number,
    height: number
  ) {
    super();
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    
    this.mesh = [
      new Point2D(X - width, Y - height),
      new Point2D(X + width, Y - height),
      new Point2D(X + width, Y + height),
      new Point2D(X - width, Y + height),
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
}
