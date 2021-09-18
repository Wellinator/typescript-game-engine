import { Engine } from './classes/Engine';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const bounce = -0.9

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

sprite2.setDirection((11 * Math.PI) / 6);
sprite2.velocity.setLength(4);
sprite2.gravitate(0.9);

sprite2.OnUpdate = () => {
  sprite2.velocity.addedTo(sprite2.gravity);
  sprite2.position.addedTo(sprite2.velocity);
  sprite2.draw();
};

scene.addSprite(sprite2);

engine.OnUpdate = () => {
  scene.update();

  //Edge wraping
  if (sprite2.X + sprite2.width / 2 > WIDTH) {
    sprite2.X = WIDTH - sprite2.width / 2;
    sprite2.velocity.X = sprite2.velocity.X * bounce;
  }
  if (sprite2.X - sprite2.width / 2 < 0) {
    sprite2.X = sprite2.width / 2;
    sprite2.velocity.X = sprite2.velocity.X * bounce;
  }
  if (sprite2.Y + sprite2.height / 2 > HEIGHT) {
    sprite2.Y = HEIGHT - sprite2.height / 2;
    sprite2.velocity.Y = sprite2.velocity.Y * bounce;
  }
  if (sprite2.Y - sprite2.height / 2 < 0) {
    sprite2.Y = sprite2.height / 2;
    sprite2.velocity.Y = sprite2.velocity.Y * bounce;
  }
};

engine.getInputKeys = (pressedKeys) => {
  if (pressedKeys['w']) {
    sprite2.Y = sprite2.Y - 1;
  }
  if (pressedKeys['a']) {
    sprite2.X = sprite2.X - 1;
  }
  if (pressedKeys['s']) {
    sprite2.Y = sprite2.Y + 1;
  }
  if (pressedKeys['d']) {
    sprite2.X = sprite2.X + 1;
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
