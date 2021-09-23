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

  public update(deltaTime: number): void {
    this.OnBeforeUpdate();
    this.OnUpdate(deltaTime);
    this.OnAfterUpdate();
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate(deltaTime: number): void {
    this.sprites.forEach(sprite => sprite.update(deltaTime))
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  public addSprite(...object: Sprite[]): void{
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

  public print(
    X: number,
    Y: number,
    text: number | string = ''
  ): void {
    this._context.save();
    this._context.fillStyle = '#FFFFFF'
    this._context.font = '16px Arial'
    this._context.fillText(`${text}`, X, Y);
    this._context.restore()
  }

  public draw(): void {
    for(let i = 0; i < this._sprites.length; i++){
      this._sprites[i].draw(); 
    }
  }

}
