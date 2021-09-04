import Object2D from '../Object2D';
import { Point2D } from '../Point2D';

export class Triangle extends Object2D {
  public mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;

  constructor(X: number, Y: number, size: number) {
    super();
    this.X = X;
    this.Y = Y;
    this.size = size;

    this.mesh = [
      new Point2D(X - size, Y - size),
      new Point2D(X - size, Y + size),
      new Point2D(X + size, Y + size)
    ];
  }
}
