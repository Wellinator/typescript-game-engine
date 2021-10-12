import { TileCoordinate } from "../models/TileCoordinate";

export class Tile implements TileCoordinate {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _atlas: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    atlas: HTMLImageElement,
  ){
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._atlas = atlas;
  }

  public get x(): number{
    return this._x
  }

  public get y(): number{
    return this._y
  }

  public get width(): number{
    return this._width
  }

  public get height(): number{
    return this._height
  }
  
  public get atlas(): HTMLImageElement{
    return this._atlas;
  }
}