import { Cube } from './classes/Cube';
import { ConstantsService } from './services/constants.service';

const constantService = new ConstantsService();

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = constantService.WIDTH;
canvas.height = constantService.HEIGHT;


ctx.font = "10px Courier New";
ctx.lineWidth = constantService.PIXEL_SIZE;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';

const cube = new Cube( 0, 0, 400, 100);

window.document.addEventListener('keydown', (event: KeyboardEvent)=> queryButtons(event))

const queryButtons = (event: KeyboardEvent): void => {
  event.preventDefault();
  if (event.key == 'ArrowUp') {
    cube.rotateX(-constantService.SPEED);
  }
  else if (event.key == 'ArrowDown') {
    cube.rotateX(constantService.SPEED);
  }
  else if (event.key == 'ArrowLeft') {
    cube.rotateY(constantService.SPEED);
  }
  else if (event.key == 'ArrowRight') {
    cube.rotateY(-constantService.SPEED);
  }
  else if (event.key == '+') {
    constantService.VIEW_DISTANCE -= constantService.SPEED / 50;
  }
  else if (event.key == '-') {
    constantService.VIEW_DISTANCE += constantService.SPEED / 50;
  }
}

const times: any[] = [];

const fpsCounter = (): number => {
  let fps = performance.now();
  const now = performance.now();
  while (times.length > 0 && times[0] <= fps - 1000) {
    times.shift();
  }
  times.push(now);
  return times.length;
}


function main() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  cube.render(ctx);
  
  if(constantService.DEBUG_MODE){
    const FPS = fpsCounter();
    //Print
    ctx.fillStyle = '#FFF';
    ctx.fillText(`FPS: ${FPS.toFixed(2)}`, constantService.WIDTH - 100, 20);

    cube.mesh.forEach( (vtx, index) => {
      ctx.fillText(`[X: ${vtx.X.toFixed(4)}, Y: ${vtx.Y.toFixed(4)} Z: ${vtx.Z.toFixed(4)}]`, 10, 20 + (index++ * 15 ));
    })
  }
  
  window.requestAnimationFrame(main);
}

main();
