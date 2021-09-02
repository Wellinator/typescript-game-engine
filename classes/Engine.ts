import { ConstantsService } from '../services/constants.service';

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
    this.context.font = "10px Courier New";
    this.context.lineWidth = this.constantsService.PIXEL_SIZE;
    this.context.strokeStyle = 'white';
    this.gameLoop()
  }

  private gameLoop() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.constantsService.WIDTH, this.constantsService.WIDTH);
    
    if(this.constantsService.DEBUG_MODE){
      const FPS = this.fpsCounter();
      this.context.fillStyle = '#FFF';
      this.context.fillText(`FPS: ${FPS.toFixed(2)}`, this.constantsService.WIDTH - 100, 20);
    }
    window.requestAnimationFrame(this.gameLoop.bind(this));
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

}
