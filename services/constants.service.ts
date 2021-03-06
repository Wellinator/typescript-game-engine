export class ConstantsService {
  public DEBUG_MODE = true;
  public PIXEL_SIZE = .5;
  public SPEED = 5;

  public get WIDTH(): number{
    return window.innerWidth;
  }

  public get HEIGHT(): number {
    return window.innerHeight;
  }

  private _FIELD_OF_VIEW: number = 200;
  private _VIEW_DISTANCE: number = 0;

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
}
