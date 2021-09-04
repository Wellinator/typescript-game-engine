import Object2D from '../Object2D';
import { Point2D } from '../Point2D';

export class Circle extends Object2D {
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;

  constructor(X: number, Y: number, size: number) {
    super();
    this.X = X;
    this.Y = Y;
    this.size = size;
    this.mesh = [];
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.X, this.Y, this.size, 0, 2 * Math.PI);
    context.stroke();
  }
  
}
