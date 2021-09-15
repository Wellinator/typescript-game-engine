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
const sprite1 = scene.createSprite(
  WIDTH/2, HEIGHT/2,
  100, 100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);
sprite1.mass = 100;

const sprite2 = scene.createSprite( 
  0, 0,
  100, 100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);

sprite1.OnUpdate = function() {
  this.draw();
}

sprite2.OnUpdate = function() {
  if(this._velocity.length){
    this._position.addedTo(this._velocity);
    this.accelerate();
  }
  this.draw();
}

scene.addSprite(sprite1, sprite2);
engine.OnUpdate = () => {
  scene.update();

  sprite2.gravitateToObject(sprite1);
  sprite2.accelerate(thrust);

  if(sprite2.X > WIDTH ) sprite2.X = 0;
  if(sprite2.X < 0 ) sprite2.X = WIDTH;
  if(sprite2.Y > HEIGHT ) sprite2.Y = 0;
  if(sprite2.Y < 0 ) sprite2.Y = HEIGHT;
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
    sprite2.rotateCounterClockWise(5);
  }
  if (pressedKeys['ArrowRight']) {
    sprite2.rotateClockWise(5);
  }
  if (pressedKeys['ArrowUp']) {
    sprite2.scale(1.01);
  }
  if (pressedKeys['ArrowDown']) {
    sprite2.scale(0.99);
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
