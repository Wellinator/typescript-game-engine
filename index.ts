import { Cube } from './classes/Cube';

const PIXEL_SIZE = .5;
const SPEED = 1;
let VIEW_DISTANCE = 5;
const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;
const canvas: HTMLCanvasElement = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.lineWidth = PIXEL_SIZE;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';

const cube = new Cube(10);

window.document.addEventListener('keydown', (event: KeyboardEvent)=> queryButtons(event))

const queryButtons = (event: KeyboardEvent): void => {
  event.preventDefault();
  if (event.key == 'ArrowUp') {
    cube.rotateX(-SPEED);
  }
  else if (event.key == 'ArrowDown') {
    cube.rotateX(SPEED);
  }
  else if (event.key == 'ArrowLeft') {
    cube.rotateY(SPEED)
  }
  else if (event.key == 'ArrowRight') {
    cube.rotateY(-SPEED);
  }
  else if (event.key == '+') {
    VIEW_DISTANCE -= SPEED / 50;
  }
  else if (event.key == '-') {
    VIEW_DISTANCE += SPEED / 50;
  }
}

function main() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  cube.project(WIDTH, HEIGHT, 150, VIEW_DISTANCE );
  cube.render(ctx);
  window.requestAnimationFrame(main);
}

main();
