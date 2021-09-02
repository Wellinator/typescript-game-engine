import { Cube } from './classes/Cube';
import { Engine } from './classes/Engine';
import { Point2D } from './classes/Point2D';
import { Sprite } from './classes/Sprite';
import { ConstantsService } from './services/constants.service';

const constantService = new ConstantsService();
const canvas: HTMLCanvasElement = document.querySelector('canvas');

//Create Engine;
const engine = new Engine(canvas);

//Create a 2D scene;
const scene = engine.create2DScene();

const mySprite = new Sprite(0, 0, 10);
mySprite.mesh = [
  new Point2D(10 * mySprite.size, 20 * mySprite.size),
  new Point2D(20 * mySprite.size, 20 * mySprite.size),
  new Point2D(15 * mySprite.size, 30 * mySprite.size),
];

scene.addObject2D(mySprite);

engine.OnUpdate = () => {
  scene.OnUpdate();
}

window.document.addEventListener('keydown', (event: KeyboardEvent)=> queryButtons(event))
const queryButtons = (event: KeyboardEvent): void => {
  event.preventDefault();
  if (event.key == 'ArrowUp') {
    
  }
  else if (event.key == 'ArrowDown') {
    
  }
  else if (event.key == 'ArrowLeft') {
    mySprite.rotateCounterClockWise(.05)
  }
  else if (event.key == 'ArrowRight') {
    mySprite.rotateCounterClockWise(.05)
  }
  else if (event.key == '+') {
    constantService.VIEW_DISTANCE -= constantService.SPEED / 50;
  }
  else if (event.key == '-') {
    constantService.VIEW_DISTANCE += constantService.SPEED / 50;
  }
}