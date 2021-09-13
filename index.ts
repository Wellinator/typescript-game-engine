import { Engine } from './classes/Engine';
import { Vector2 } from './classes/primitives/Vector2';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const thrust = new Vector2(0, 0);

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

scene.addObject2D(mySprite);
engine.OnUpdate = () => {
  scene.OnUpdate();

  mySprite.accelerate(thrust);

  if(mySprite.X > WIDTH ) mySprite.X = 0;
  if(mySprite.X < 0 ) mySprite.X = WIDTH;
  if(mySprite.Y > HEIGHT ) mySprite.Y = 0;
  if(mySprite.Y < 0 ) mySprite.Y = HEIGHT;
};


engine.getInputKeys = pressedKeys => {

  if (pressedKeys['w']) {
    thrust.Y = -.01;
  }
  if (pressedKeys['a']) {
    thrust.X = -.01;
  }
  if (pressedKeys['s']) {
    thrust.Y = +.01;
  }
  if (pressedKeys['d']) {
    thrust.X = +.01;
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

engine.OnUnpressKey = (unpressedKey) => {
  if(unpressedKey === 'w' || unpressedKey === 's'){
    thrust.Y = 0;
  }
  if(unpressedKey === 'a' || unpressedKey === 'd'){
    thrust.X = 0;
  }
}
