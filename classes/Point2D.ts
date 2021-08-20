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

  get X(): number{
    return this._X
  }

  set X( X:number){
    this._X = X
  }

  get Y(): number{
    return this._Y
  }

  set Y( Y:number){
    this._Y = Y
  }

}