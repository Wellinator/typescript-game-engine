import { Cube } from './classes/Cube';
import { Engine } from './classes/Engine';
import { ConstantsService } from './services/constants.service';

const constantService = new ConstantsService();
const canvas: HTMLCanvasElement = document.querySelector('canvas');

const engine = new Engine(canvas);
const cube = new Cube( 0, 0, 400, 100);
//cube.render();

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