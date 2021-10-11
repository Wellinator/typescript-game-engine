import { TileCoordinate } from "../models/TileCoordinate";

export class Tile implements TileCoordinate {
  private _x: number;
  private _y: number;

  constructor(
    x: number,
    y: number,
  ){
    // TODO -> Implements width, height and atlas;
    this._x = x;
    this._y = y;
  }

  public get x(): number{
    return this._x
  }

  public get y(): number{
    return this._y
  }
}