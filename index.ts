import { Cube } from './classes/Cube';
import { ConstantsService } from './constants.service';

const constantService = new ConstantsService();

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = constantService.WIDTH;
canvas.height = constantService.HEIGHT;

ctx.font = "10px Courier New";
ctx.lineWidth = constantService.PIXEL_SIZE;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';

const cube = new Cube( 0, 0, 0, 100);

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
    cube.rotateY(constantService.SPEED)
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

function main() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  cube.render(ctx);
  
  if(constantService.DEBUG_MODE){
    //Print
    ctx.fillStyle = '#FFF';
    cube.mesh.forEach( (vtx, index) => {
      ctx.fillText(`[X: ${vtx.X.toFixed(4)}, Y: ${vtx.Y.toFixed(4)} Z: ${vtx.Z.toFixed(4)}]`, 10, 20 + (index++ * 15 ));
    })
  }
  
  window.requestAnimationFrame(main);
}

main();
