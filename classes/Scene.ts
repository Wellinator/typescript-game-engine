import { Sprite } from './Sprite';

export class Scene2D {
  private _context: CanvasRenderingContext2D;
  private _sprites: Sprite[] = [];
  private _backGroundColor: string;

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate(): void {
    this._sprites.forEach(sprite => sprite.update());
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  public addObject2D(...object: Sprite[]): void{
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
