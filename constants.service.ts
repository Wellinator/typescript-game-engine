export class ConstantsService {

  public PIXEL_SIZE = .5;
  public SPEED = 1;

  public get WIDTH(): number{
    return document.documentElement.clientWidth;
  }

  public get HEIGHT(): number {
    return document.documentElement.clientHeight;
  }

  private _FIELD_OF_VIEW: number = 250;
  private _VIEW_DISTANCE: number = 50;

  public get FIELD_OF_VIEW(){
    return this._FIELD_OF_VIEW;
  }

  public set FIELD_OF_VIEW(value: number){
    this._FIELD_OF_VIEW = value;
  }

  public get VIEW_DISTANCE(){
    return this._VIEW_DISTANCE;
  }

  public set VIEW_DISTANCE(value: number){
    this._VIEW_DISTANCE = value;
  }

  public get PerspectiveMatrix(): number[][] {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
  }

  public RotateXMatrix(angle: number): number[][] {
    return [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)]
    ];
  }

  public RotateYMatrix(angle: number): number[][] {
    return [
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)]
    ];
  }

  public RotateZMatrix(angle: number): number[][] {
    return [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1]
    ];
  }
}
