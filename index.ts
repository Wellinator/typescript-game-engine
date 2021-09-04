import { Cube } from './classes/Cube';
import { Engine } from './classes/Engine';
import { Point2D } from './classes/Point2D';
import { Circle } from './classes/primitives/Circle';
import { Triangle } from './classes/primitives/Triangle';
import { Sprite } from './classes/Sprite';
import { ConstantsService } from './services/constants.service';

const constantService = new ConstantsService();
const canvas: HTMLCanvasElement = document.querySelector('canvas');

//Create Engine;
const engine = new Engine(
  canvas,
  window.innerWidth * .95,
  window.innerHeight * .95
  );

//Create a 2D scene;
const scene = engine.create2DScene();

const myTriangle = new Triangle(100, 100, 50);
const myCircle = new Circle(200, 100, 50);
const mySprite = new Sprite(310, 100, 50, 50);

scene.addObject2D(myTriangle, myCircle, mySprite);

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
    myTriangle.rotateCounterClockWise(5)
    mySprite.rotateCounterClockWise(5)
  }
  else if (event.key == 'ArrowRight') {
    myTriangle.rotateClockWise(5)
    mySprite.rotateClockWise(5)
  }
  else if (event.key == '+') {
    constantService.VIEW_DISTANCE -= constantService.SPEED / 50;
  }
  else if (event.key == '-') {
    constantService.VIEW_DISTANCE += constantService.SPEED / 50;
  }
}