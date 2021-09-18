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
const sprite2 = scene.createSprite(
  51,
  51,
  100,
  100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);

sprite2.OnUpdate = function() {
  if (this._velocity.length) {
    this._position.addedTo(this._velocity);
    this.accelerate();
  }
  this.draw();
};

scene.addSprite(sprite2);
engine.OnUpdate = () => {
  scene.update();
  sprite2

  sprite2.accelerate(thrust);

  //Edge wraping
  if (sprite2.X + sprite2.width / 2 > WIDTH){
    sprite2.X = WIDTH - sprite2.width / 2;
    sprite2.velocity.X = sprite2.velocity.X * -1;
  };
  if (sprite2.X - sprite2.width / 2 < 0){
    sprite2.X = sprite2.width / 2;
    sprite2.velocity.X = sprite2.velocity.X * -1;
  }
  if (sprite2.Y + sprite2.height / 2 > HEIGHT){
    sprite2.Y = HEIGHT - sprite2.height / 2;
    sprite2.velocity.Y = sprite2.velocity.Y * -1;
  }
  if (sprite2.Y - sprite2.height / 2 < 0){
    sprite2.Y = sprite2.height / 2;
    sprite2.velocity.Y = sprite2.velocity.Y * -1;
  }
};

engine.getInputKeys = pressedKeys => {
  if (pressedKeys['w']) {
    thrust.Y = -0.01;
  }
  if (pressedKeys['a']) {
    thrust.X = -0.01;
  }
  if (pressedKeys['s']) {
    thrust.Y = +0.01;
  }
  if (pressedKeys['d']) {
    thrust.X = +0.01;
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

engine.OnUnpressKey = unpressedKey => {
  if (unpressedKey === 'w' || unpressedKey === 's') {
    thrust.Y = 0;
  }
  if (unpressedKey === 'a' || unpressedKey === 'd') {
    thrust.X = 0;
  }
};
