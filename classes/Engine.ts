import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

export class Engine {
  private _FPS: number = 0;
  private context: CanvasRenderingContext2D;
  private constantsService: ConstantsService = new ConstantsService();
  private _keysDown: string[] = [];
  private _WIDTH: number;
  private _HEIGHT: number;
  private CURRENT_FRAME_TIME = 0;
  private PREVIOUS_FRAME_TIME = 0;
  private FPS_LIMIT: number;
  private MAX_UPDATE_CALLS = 300;
  private LAST_FPS_UPDATE = 0;
  private FRAMES_THIS_SECOND = 0;

  constructor(
    canvas: HTMLCanvasElement,
    width = undefined,
    height = undefined,
    fps: number = 60
  ) {
    this.FPS_LIMIT = fps;
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

  private get TIME_STEP(): number {
    return 1000 / this.FPS_LIMIT;
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

  private clearFrame(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this._WIDTH, this._HEIGHT);
  }

  fpsController() {
    this.CURRENT_FRAME_TIME = performance.now();
    this.PREVIOUS_FRAME_TIME = this.CURRENT_FRAME_TIME;
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameLoop(timestamp: number) {
    // Request for the next RAF;
    window.requestAnimationFrame(this.gameLoop.bind(this));
    
    let deltaTimestamp = 0;

    // Set isNextFrame bool variable;
    let isNextFrame = (
      timestamp - this.PREVIOUS_FRAME_TIME > this.TIME_STEP
    );

    //If it's next frame then, update and draw;
    if (isNextFrame) {
      //console.log(this.PREVIOUS_FRAME_TIME, this.TIME_STEP);
      //Timestamp variation to update data;
      deltaTimestamp += timestamp - this.PREVIOUS_FRAME_TIME;

      // Update Elapsed time;
      this.PREVIOUS_FRAME_TIME = timestamp - ((timestamp - this.PREVIOUS_FRAME_TIME) % this.TIME_STEP);

      // Clear the canvas frame before redraw;
      this.clearFrame();

      // Get input values
      this.getInputKeys(this._keysDown);

      // Call OnBeforeUpdate, used to prepare values if needed;
      this.OnBeforeUpdate();
     
      //Update FPS counter;
      if (timestamp > this.LAST_FPS_UPDATE + 1000) {
        this.FPS = 0.85 * this.FRAMES_THIS_SECOND + 0.15 * this.FPS;
        this.LAST_FPS_UPDATE = timestamp;
        this.FRAMES_THIS_SECOND = 0;
      }
      this.FRAMES_THIS_SECOND++;

      let UPDATE_STEP_COUNTER = 0;
      //Fix timestamp varying size
      while (deltaTimestamp >= this.TIME_STEP) {

        // Call the OnUpdate lifecicle function;
        this.OnUpdate(this.TIME_STEP);

        //Update delta;
        deltaTimestamp -= this.TIME_STEP;

        //Sanity check;
        if (++UPDATE_STEP_COUNTER >= this.MAX_UPDATE_CALLS) {
          //Reset deltaTimestamp if the updates exceed the maximum limit calls
          deltaTimestamp = 0;
          break;
        }
      }

      // Calls the draw function after update data;
      this.OnDraw();

      // Call the OnAfterUpdate lifecicle function;
      this.OnAfterUpdate();
    }
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

  public OnUpdate(deltaTimestamp: number) {
    return;
  }

  public OnDraw(): void {
    return;
  }

  public OnAfterUpdate() {
    return;
  }

  public get FPS(): number {
    return Math.round(this._FPS);
  }

  private set FPS(value: number) {
    this._FPS = value;
  }

  public create2DScene(): Scene2D {
    return new Scene2D(this.context);
  }
}
