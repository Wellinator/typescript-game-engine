/* Adapted from:
Daniel Shiffman
http://codingtra.in
http://patreon.com/codingtrain
For more: https://github.com/CodingTrain/QuadTree
*/

import Object2D from "../classes/Object2D";

export class Rectangle {
  private _X: number;
  private _Y: number;
  private _W: number;
  private _H: number;

  constructor(X: number, Y: number, W: number, H: number) {
    this._X = X;
    this._Y = Y;
    this._W = W;
    this._H = H;
  }

  public get X(): number {
    return this._X;
  }

  public get Y(): number {
    return this._Y;
  }

  public get width(): number {
    return this._W;
  }

  public get height(): number {
    return this._H;
  }

  contains(point: Object2D): boolean {
    return (
      point.X >= this._X - this._W &&
      point.X < this._X + this._W &&
      point.Y >= this._Y - this._H &&
      point.Y < this._Y + this._H
    );
  }

  intersects(range: Rectangle): boolean {
    return !(
      range.X - range.width > this._X + this._W ||
      range.X + range.width < this._X - this._W ||
      range.Y - range.height > this._Y + this._H ||
      range.Y + range.height < this._Y - this._H
    );
  }
}
