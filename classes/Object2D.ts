import { Point2D } from './Point2D';

abstract class Object2D {
  abstract mesh: Point2D[];
  public size: number;
  public X: number;
  public Y: number;

  constructor(X: number, Y: number, size: number) {
    this.X = X;
    this.Y = Y;
    this.size = size;
  }

  public rotateClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) +
        (point.Y - this.Y) * -Math.sin(rad);
      const Y =
        (point.Y - this.Y) * Math.sin(rad) + (point.X - this.X) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  public rotateCounterClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) + (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.Y - this.Y) * -Math.sin(rad) +
        (point.X - this.X) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.mesh.forEach((point2d, index, vertices) => {
      if (index === 0) {
        context.beginPath();
        context.moveTo(point2d.X, point2d.Y);
      }
      context.lineTo(point2d.X, point2d.Y);
      if (vertices.length === index && vertices.length >= 3) {
        context.closePath();
      }
      context.strokeStyle = 'rgba(255,255,255,1)';
      context.stroke();
    });
  }
}

export default Object2D;
