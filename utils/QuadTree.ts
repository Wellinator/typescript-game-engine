/* Adapted from:
Daniel Shiffman
http://codingtra.in
http://patreon.com/codingtrain
For more: https://github.com/CodingTrain/QuadTree
*/

import Object2D from '../classes/Object2D';
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';

export class QuadTree {
  private _boundary: Rectangle;
  private _capacity: number;
  private _objects: Object2D[] = [];
  private _isDivided: boolean = false;
  private northEast: QuadTree;
  private northWest: QuadTree;
  private southEast: QuadTree;
  private southWest: QuadTree;

  constructor(boundary: Rectangle, n: number) {
    this._boundary = boundary;
    this._capacity = n;
  }

  public insert(object: Object2D): boolean {
    if (!this._boundary.contains(object)) {
      return false;
    }
    if (this._objects.length < this._capacity) {
      this._objects.push(object);
      return true;
    } else {
      if (!this._isDivided) {
        this.subdivide();
      }
      if (this.northEast.insert(object)) {
        return true;
      } else if (this.northWest.insert(object)) {
        return true;
      } else if (this.southEast.insert(object)) {
        return true;
      } else if (this.southWest.insert(object)) {
        return true;
      }
    }
  }

  private subdivide() {
    const x = this._boundary.X;
    const y = this._boundary.Y;
    const w = this._boundary.width;
    const h = this._boundary.height;
    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

    this.northEast = new QuadTree(ne, this._capacity);
    this.northWest = new QuadTree(nw, this._capacity);
    this.southEast = new QuadTree(se, this._capacity);
    this.southWest = new QuadTree(sw, this._capacity);
    this._isDivided = true;
  }

  public query(range: Rectangle, found: Object2D[] = []): Object2D[] {
    if (!this._boundary.intersects(range)) {
      return;
    } else {
      for (let i = 0; i < this._objects.length; i++) {
        if (range.contains(this._objects[i])) {
          found.push(this._objects[i]);
        }
      }
      if (this._isDivided) {
        this.northWest.query(range, found);
        this.northEast.query(range, found);
        this.southWest.query(range, found);
        this.southEast.query(range, found);
      }
    }
    return found;
  }
}
