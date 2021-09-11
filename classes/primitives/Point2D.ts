export class Point2D {
  private _X: number;
  private _Y: number;
  
  constructor(
    X: number,
    Y: number
  ){
    this._X = X;
    this._Y = Y;
  }

  public get X(): number{
    return this._X
  }

  public set X( X:number){
    this._X = X
  }

  public get Y(): number{
    return this._Y
  }

  public set Y( Y:number){
    this._Y = Y
  }

  public get angle(): number{
    return Math.atan2(this.X, this.Y);
  }

  public get length(): number {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
  }

  public add(point: Point2D): Point2D {
    return new Point2D( this.X + point.X, this.Y + point.Y );
  }
  
  public subtract(point: Point2D): Point2D {
    return new Point2D( this.X - point.X, this.Y - point.Y );
  }

  public multiply(factor: number): Point2D {
    return new Point2D( this.X * factor, this.Y * factor);
  }

  public divide(divisor: number): Point2D {
    return new Point2D( this.X / divisor, this.Y / divisor);
  }

  public addedTo(point: Point2D): Point2D {
    this.X += point.X;
    this.Y += point.Y;
    return this;
  }

  public subtractedFrom(point: Point2D): Point2D {
    this.X -= point.X;
    this.Y -= point.Y;
    return this;
  }

  public multipliedBy(factor: number): Point2D {
    this.X *= factor;
    this.Y *= factor;
    return this;
  }

  public dividedBy(divisor: number): Point2D {
    this.X *= divisor;
    this.Y *= divisor;
    return this;
  }

  toAngle(angle: number): Point2D {
    this.X = Math.cos(angle) * this.length;
    this.Y = Math.sin(angle) * this.length;
    return this;
  }

  public setLength(length: number): Point2D {
    this.X = Math.cos(length) * this.angle;
    this.Y = Math.sin(length) * this.angle;
    return this;
  }

}