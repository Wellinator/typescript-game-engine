import Object2D from '../Object2D';
import { Point2D } from './Point2D';
import { Rectangle } from './Rectangle';

export class Circle extends Object2D {
  public mesh: Point2D[];
  public size: number;
  private _rSquared: number;

  constructor(X: number, Y: number, size: number) {
    super();
    this.X = X;
    this.Y = Y;
    this.size = size;
    this.mesh = [];
  }

  public get r(): number {
    return this._rSquared;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.X, this.Y, this.size, 0, 2 * Math.PI);
    context.stroke();
  }

  contains(object: Object2D): boolean {
    const d = Math.pow(object.X - this.X, 2) + Math.pow(object.Y - this.Y, 2);
    return d <= this._rSquared;
  }

  intersects(range: Rectangle): boolean {
    const xDist = Math.abs(range.X - this.X);
    const yDist = Math.abs(range.Y - this.Y);
    const r = this.r;
    const w = range.width;
    const h = range.height;
    const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this._rSquared;
  }
  
}
