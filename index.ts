import { Engine } from './classes/Engine';
import { Vector2 } from './classes/primitives/Vector2';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//Create Engine;
const engine = new Engine(canvas, WIDTH, HEIGHT);

//Create a 2D scene;
const scene = engine.create2DScene();

//Create asimple Sprite 
const mySprite = scene.createSprite(
  0,
  0,
  100,
  100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);

mySprite.setVelocity(0.5);
mySprite.acceleration = new Vector2(.05, .05);

scene.addObject2D(mySprite);
engine.OnUpdate = () => {
  scene.OnUpdate();
  if(mySprite.X >= WIDTH ) mySprite.X = 0;
  if(mySprite.Y >= HEIGHT ) mySprite.Y = 0;
};

engine.getInputKeys = pressedKeys => {
  if (pressedKeys['w']) {
    mySprite.setDirection((270 * Math.PI) / 180);
  }
  if (pressedKeys['a']) {
    mySprite.setDirection((180 * Math.PI) / 180);
  }
  if (pressedKeys['s']) {
    mySprite.setDirection((90 * Math.PI) / 180);
  }
  if (pressedKeys['d']) {
    mySprite.setDirection((0 * Math.PI) / 180);
  }
  if (pressedKeys['ArrowLeft']) {
    mySprite.rotateCounterClockWise(5);
  }
  if (pressedKeys['ArrowRight']) {
    mySprite.rotateClockWise(5);
  }
  if (pressedKeys['ArrowUp']) {
    mySprite.scale(1.01);
  }
  if (pressedKeys['ArrowDown']) {
    mySprite.scale(0.99);
  }
};
