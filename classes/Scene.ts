import { Sprite } from './Sprite';

export class Scene2D {
  private _context: CanvasRenderingContext2D;
  private _sprites: Sprite[] = [];
  private _backGroundColor: string;

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  get sprites(): Sprite[] {
    return this._sprites;
  }

  public update(deltaTimestamp: number): void {
    this.OnBeforeUpdate();
    this.OnUpdate(deltaTimestamp);
    this.OnAfterUpdate();
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate(deltaTimestamp: number): void {
    this.sprites.forEach((sprite) => sprite.update(deltaTimestamp));
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  public addSprite(...object: Sprite[]): void {
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
    tileWidth: number = undefined,
    tileHeight: number = undefined,
    atlas: string | ArrayBuffer
  ): Sprite {
    return new Sprite(
      this._context,
      X,
      Y,
      width,
      height,
      tileWidth,
      tileHeight,
      atlas
    );
  }

  public print(X: number, Y: number, text: number | string = ''): void {
    this._context.save();
    this._context.fillStyle = '#FFFFFF';
    this._context.font = '16px Arial';
    this._context.fillText(`${text}`, X, Y);
    this._context.restore();
  }

  public draw(): void {
    for (let i = 0; i < this._sprites.length; i++) {
      this._sprites[i].draw();
    }
  }
}
