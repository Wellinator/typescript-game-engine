import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

export class Engine {
  private fpsTimes: number[] = [];
  private context: CanvasRenderingContext2D;
  private constantsService: ConstantsService = new ConstantsService();

  constructor(
    canvas: HTMLCanvasElement,
    WIDTH: number = document.documentElement.clientWidth,
    HEIGHT: number = document.documentElement.clientHeight
  ) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    this.context = canvas.getContext('2d');
    this.context.font = '10px Courier New';
    this.context.lineWidth = this.constantsService.PIXEL_SIZE;
    this.context.strokeStyle = 'white';
    this.gameLoop();
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

  private gameLoop() {
    this.OnBeforeUpdate();

    this.clearFrame();
    const FPS = this.fpsCounter();
    
    this.OnUpdate();
    if (this.constantsService.DEBUG_MODE) {
      this.context.fillStyle = '#FFF';
      this.context.fillText(
        `${FPS.toFixed(1)} FPS`,
        this.constantsService.WIDTH - 100,
        20
      );
    }
    this.OnAfterUpdate();
    window.requestAnimationFrame(this.gameLoop.bind(this));
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
