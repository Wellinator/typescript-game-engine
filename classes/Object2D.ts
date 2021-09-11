import { Point2D } from "./primitives/Point2D";
import { Vector2 } from "./primitives/Vector2";

abstract class Object2D {
  abstract mesh: Point2D[];
  abstract size: number;
  abstract _position: Vector2;
  abstract _velocity: Vector2;

  public get X(): number{
    return this._position.X;
  }

  public get Y(): number{
    return this._position.Y;
  }

  public set X(value: number){
    this._position.X = value;
  }

  public set Y(value: number){
    this._position.Y = value;
  }

  public get velocity(){
    return this._velocity;
  }

  public setVelocity(value: number): Object2D {
    this._velocity.setLength(value);
    return this;
  }

  public setDirection(angle: number): Object2D {
    this._velocity.toAngle(angle);
    return this;
  }

  public rotateClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) -
        (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.X - this.X) * Math.sin(rad) + 
        (point.Y - this.Y) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  public rotateCounterClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) +
        (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.X - this.X) * - Math.sin(rad) + 
        (point.Y - this.Y) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  abstract draw(context: CanvasRenderingContext2D): void

  public translate(X: number, Y: number): Object2D{
    this.mesh = this.mesh.map((point: Point2D) => {
      point.X = point.X - this.X + X;
      point.Y = point.Y - this.Y + Y;
      return point;
    });
    this.X = X;
    this.Y = Y;
    return this;
  }

  public scale(scalingFactor: number): Object2D {
    this.size *= scalingFactor;
    this.mesh.map( point => {
      point.X = ((point.X - this.X) * scalingFactor) + this.X;
      point.Y = ((point.Y - this.Y) * scalingFactor) + this.Y;
      return point;
    });
    return this;
  }

}

export default Object2D;
