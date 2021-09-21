import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

export class Engine {
  private fpsTimes: number[] = [];
  private context: CanvasRenderingContext2D;
  private constantsService: ConstantsService = new ConstantsService();
  private _keysDown: string[] = [];
  private _WIDTH: number;
  private _HEIGHT: number;
  private current_time = 0;
  private previous_time = 0;

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
    this.context.imageSmoothingEnabled = false;
    this.context.imageSmoothingQuality = 'medium';
    this._initInputSystem();
    this.fpsController();
  }

  private _initInputSystem() {
    window.document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.OnPressKey(event.key);
      this._keysDown[event.key] = true;
    });
    window.document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.OnUnpressKey(event.key);
      this._keysDown[event.key] = false;
    });
  }

  fpsController(FPS_LIMIT: number = 15) {
    this.current_time = performance.now();
    this.previous_time = this.current_time;
    this.gameLoop(FPS_LIMIT);
  }

  private clearFrame(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this._WIDTH, this._HEIGHT);
  }

  private gameLoop(FPS_LIMIT: number) {
    window.requestAnimationFrame(this.gameLoop.bind(this, FPS_LIMIT));
    const now = performance.now();
    const elapsed_time = now - this.current_time;
    const FPS_INTERVAL = 1000 / FPS_LIMIT;
    if (elapsed_time > FPS_INTERVAL){
      this.current_time = now - (elapsed_time % FPS_INTERVAL)
      this.getInputKeys(this._keysDown);
      this.OnBeforeUpdate();
      this.clearFrame();
      const FPS = this.fpsCounter();
      this.OnUpdate();
      if (this.constantsService.DEBUG_MODE) {
        this.context.fillStyle = '#FFF';
        this.context.font = '16px Courier New';
        this.context.fillText(`${FPS.toFixed(1)} FPS`, this._WIDTH - 100, 20);
        this.context.font = '10px Courier New';
      }
      this.OnAfterUpdate(); 
    };
  }

  public getInputKeys(keysPressed: string[]): void {
    return;
  }

  public OnPressKey(pressedKey: string): void {
    return;
  }

  public OnUnpressKey(unpressedKey: string): void {
    return;
  }

  public OnBeforeUpdate() {
    return;
  }

  public OnUpdate() {
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
