import Object2D from './Object2D';

export class Scene2D {
  private _context: CanvasRenderingContext2D;
  private _sprites: Object2D[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate() {
    this._sprites.forEach(sprite => sprite.draw(this._context));
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  public addObject2D(...object: Object2D[]): void{
    this._sprites.push(...object);
  }

}