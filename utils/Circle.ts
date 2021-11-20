/* Adapted from:
Daniel Shiffman
http://codingtra.in
http://patreon.com/codingtrain
For more: https://github.com/CodingTrain/QuadTree
*/

import Object2D from '../classes/Object2D';
import { Rectangle } from './Rectangle';

export class Circle {
  private _X: number;
  private _Y: number;
  private _rSquared: number;

  constructor(X: number, Y: number, r: number) {
    this._X = X;
    this._Y = Y;
    this._rSquared = r * r;
  }

  public get X(): number {
    return this._X;
  }

  public get Y(): number {
    return this._Y;
  }

  public get r(): number {
    return this._rSquared;
  }

  contains(object: Object2D): boolean {
    const d = Math.pow(object.X - this.X, 2) + Math.pow(object.Y - this.Y, 2);
    return d <= this._rSquared;
  }

  intersects(range: Rectangle): boolean {
    const xDist = Math.abs(range.X - this._X);
    const yDist = Math.abs(range.Y - this._Y);
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
