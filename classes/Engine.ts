import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

export class Engine {
  private fpsTimes: number[] = [];
  private context: CanvasRenderingContext2D;
  private constantsService: ConstantsService = new ConstantsService();
  private _keysDown: string[] = [];
  private _WIDTH: number;
  private _HEIGHT: number;
  private secondsPassed = 0;
  private oldTimeStamp = 0;
  private movingSpeed = 50;

  constructor(
    canvas: HTMLCanvasElement,
    width = undefined,
    height = undefined
  ) {
    this._WIDTH = width || this.constantsService.WIDTH;
    this._HEIGHT = height || this.constantsService.HEIGHT;
    canvas.width = this._WIDTH;
    canvas.height = this._HEIGHT;
    this.context = canvas.getContext('2d');
    this.context.font = '10px Courier New';
    this.context.lineWidth = this.constantsService.PIXEL_SIZE;
    this.context.strokeStyle = 'white';
    this._initInputSystem();
    this.gameLoop(this.secondsPassed);
  }

  private _initInputSystem() {
    window.document.addEventListener(
      'keydown',
      (event: KeyboardEvent) => (this._keysDown[event.key] = true)
    );
    window.document.addEventListener(
      'keyup',
      (event: KeyboardEvent) => (this._keysDown[event.key] = false)
    );
  }

  private clearFrame(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(
      0,
      0,
      this.constantsService.WIDTH,
      this.constantsService.WIDTH
    );
  }

  private gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.getInputKeys(this._keysDown);

    this.OnBeforeUpdate();

    this.clearFrame();
    const FPS = this.fpsCounter();

    this.OnUpdate(this.secondsPassed);
    if (this.constantsService.DEBUG_MODE) {
      this.context.fillStyle = '#FFF';
      this.context.font = '16px Courier New';
      this.context.fillText(`${FPS.toFixed(1)} FPS`, this._WIDTH - 100, 20);
      this.context.font = '10px Courier New';
    }
    this.OnAfterUpdate();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  public getInputKeys(keysPressed: string[]): void {
    return;
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate(secondsPassed: number) {
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  private fpsCounter(): number {
    let fps = performance.now();
    const now = performance.now();
    while (this.fpsTimes.length > 0 && this.fpsTimes[0] <= fps - 1000) {
      this.fpsTimes.shift();
    }
    this.fpsTimes.push(now);
    return this.fpsTimes.length;
  }

  public create2DScene(): Scene2D {
    return new Scene2D(this.context);
  }
}
