export class Point3D {
  private _X: number;
  private _Y: number;
  private _Z: number;
  
  constructor(
    X: number,
    Y: number,
    Z: number
  ){
    this._X = X;
    this._Y = Y;
    this._Z = Z;
  }

  get X(): number{
    return this._X;
  }

  set X( X:number){
    this._X = X;
  }

  get Y(): number{
    return this._Y;
  }

  set Y( Y:number){
    this._Y = Y;
  }

  get Z(): number{
    return this._Z;
  }

  set Z( Z:number){
    this._Z = Z;
  }
}