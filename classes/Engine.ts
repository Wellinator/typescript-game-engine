import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

export class Engine {
  private fpsTimes: number[] = [];
  private context: CanvasRenderingContext2D;
  private constantsService: ConstantsService = new ConstantsService();
  private _keysDown: string[] = [];
  private _WIDTH: number;
  private _HEIGHT: number;
  private CURRENT_FRAME_TIME = 0;
  private PREVIOUS_FRAME_TIME = 0;
  private FPS_LIMIT: number = 60;

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
    this.fpsController(this.FPS_LIMIT);
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

  fpsController(FPS_LIMIT: number) {
    this.CURRENT_FRAME_TIME = performance.now();
    this.PREVIOUS_FRAME_TIME = this.CURRENT_FRAME_TIME;
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private clearFrame(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this._WIDTH, this._HEIGHT);
  }

  private gameLoop(timestamp: number) {  
    // Set isNextFrame bool variable;
    let isNextFrame = !(timestamp < this.PREVIOUS_FRAME_TIME + ( 1000 / this.FPS_LIMIT));
  
    //If it's next frame then, update and draw;
    if (isNextFrame){
      // Update Elapsed time;
      this.PREVIOUS_FRAME_TIME = timestamp;
      
      // Get input values
      this.getInputKeys(this._keysDown);

      // Call OnBeforeUpdate, used to prepare values if needed;
      this.OnBeforeUpdate();
      
      // Clear the canvas frame before redraw;
      this.clearFrame();
      
      const FPS = this.fpsCounter();
      
      // Call the OnUpdate lifecicle function;
      this.OnUpdate();
      
      // Display FPS counter if DEBUG_MODE is ON;
      if (this.constantsService.DEBUG_MODE) {
        this.context.fillStyle = '#FFF';
        this.context.font = '16px Courier New';
        this.context.fillText(`${FPS.toFixed(1)} FPS`, this._WIDTH - 100, 20);
        this.context.font = '10px Courier New';
      }

      // Call the OnAfterUpdate lifecicle function;
      this.OnAfterUpdate();
    };

    // Request for the next RAF;
    window.requestAnimationFrame(this.gameLoop.bind(this));
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
