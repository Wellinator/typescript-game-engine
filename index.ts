import { Cube } from './classes/Cube';
import { ConstantsService } from './constants.service';

const constantService = new ConstantsService();

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = constantService.WIDTH;
canvas.height = constantService.HEIGHT;

ctx.lineWidth = constantService.PIXEL_SIZE;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';

const cube = new Cube(0, 0, 10, 20);

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
  window.requestAnimationFrame(main);
}

main();
