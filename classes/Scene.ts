import Object2D from './Object2D';
import { Sprite } from './Sprite';

export class Scene2D {
  private _context: CanvasRenderingContext2D;
  private _sprites: Object2D[] = [];
  private _backGroundColor: string;

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

  public set backGroundColor(color: string) {
    this._backGroundColor = color;
  }

  public get backGroundColor(): string {
    return this._backGroundColor;
  }

  public createSprite(
    X: number,
    Y: number,
    width: number,
    height: number,
    imagePath: string | string[]
  ): Sprite {
    return new Sprite(this._context, X, Y, width, height, imagePath);
  }

}
