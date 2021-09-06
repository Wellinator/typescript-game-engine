import { Engine } from "./classes/Engine";
import { Circle } from "./classes/primitives/Circle";
import { Triangle } from "./classes/primitives/Triangle";
import { ConstantsService } from "./services/constants.service";

const constantService = new ConstantsService();
const canvas: HTMLCanvasElement = document.querySelector('canvas');

//Create Engine;
const engine = new Engine(
  canvas,
  window.innerWidth * 0.95,
  window.innerHeight * 0.95
);

//Create a 2D scene;
const scene = engine.create2DScene();

const myTriangle = new Triangle(100, 100, 50);
const myCircle = new Circle(200, 100, 50);
const mySprite = scene.createSprite(100, 210, 100, 100,'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png');

scene.addObject2D(myTriangle, myCircle, mySprite);
engine.OnUpdate = () => {
  scene.OnUpdate();
};
engine.getInputKeys = (pressedKeys) => {
  if (pressedKeys['ArrowUp']) {
  } else if (pressedKeys['ArrowDown']) {
  } else if (pressedKeys['ArrowLeft']) {
    myTriangle.rotateCounterClockWise(5);
    mySprite.rotateCounterClockWise(5);
  } else if (pressedKeys['ArrowRight']) {
    myTriangle.rotateClockWise(5);
    mySprite.rotateClockWise(5);
  } else if (pressedKeys['+']) {
    constantService.VIEW_DISTANCE -= constantService.SPEED / 50;
  } else if (pressedKeys['-']) {
    constantService.VIEW_DISTANCE += constantService.SPEED / 50;
  }
};
