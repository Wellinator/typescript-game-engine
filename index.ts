import { Engine } from './classes/Engine';
import { Circle } from './classes/primitives/Circle';
import { Triangle } from './classes/primitives/Triangle';
import { ConstantsService } from './services/constants.service';

const constantService = new ConstantsService();
const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//Create Engine;
const engine = new Engine(
  canvas,
  WIDTH,
  HEIGHT
);

//Create a 2D scene;
const scene = engine.create2DScene();

const mySprite = scene.createSprite(
  WIDTH / 2,
  HEIGHT / 2,
  100,
  100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);

scene.addObject2D(mySprite);
engine.OnUpdate = () => {
  scene.OnUpdate();
};
engine.getInputKeys = pressedKeys => {
  if (pressedKeys['w']) {
    mySprite.translate(mySprite.X, mySprite.Y - 1);
  } else if (pressedKeys['a']) {
    mySprite.translate(mySprite.X - 1, mySprite.Y);
  } else if (pressedKeys['s']) {
    mySprite.translate(mySprite.X, mySprite.Y + 1);
  } else if (pressedKeys['d']) {
    mySprite.translate(mySprite.X + 1, mySprite.Y);
  } else if (pressedKeys['ArrowLeft']) {
    mySprite.rotateCounterClockWise(5);
  } else if (pressedKeys['ArrowRight']) {
    mySprite.rotateClockWise(5);
  } else if (pressedKeys['+']) {
    constantService.VIEW_DISTANCE -= constantService.SPEED / 50;
  } else if (pressedKeys['-']) {
    constantService.VIEW_DISTANCE += constantService.SPEED / 50;
  }
};
