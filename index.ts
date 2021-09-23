import { Engine } from './classes/Engine';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const bounce = -0.8

//Create Engine;
const engine = new Engine(canvas, WIDTH, HEIGHT, 30);

//Create a 2D scene;
const scene = engine.create2DScene();

//Create asimple Sprite
const sprite = scene.createSprite(
  51,
  51,
  100,
  100,
  'https://www.seekpng.com/png/detail/383-3833431_bulbasaur-mini-sprite-bulbasaur-pixel-art.png'
);

sprite.setDirection((11 * Math.PI) / 6);
sprite.velocity.setLength(1);
sprite.gravitate(.1);
sprite.friction = .06;

sprite.OnUpdate = (deltaTime) => {
  sprite.velocity.multipliedBy(sprite.friction);
  sprite.velocity.addedTo(sprite.gravity);
  sprite.position.addedTo(sprite.velocity.multipliedBy(deltaTime));  
};

engine.OnDraw = () => {
  sprite.draw();
}

scene.addSprite(sprite);

engine.OnUpdate = (deltaTime) => {
  scene.update(deltaTime);
  scene.print(10, 20, engine.FPS);

  //Edge wraping
  if (sprite.X + sprite.width / 2 > WIDTH) {
    sprite.X = WIDTH - sprite.width / 2;
    sprite.velocity.X = sprite.velocity.X * bounce;
  }
  if (sprite.X - sprite.width / 2 < 0) {
    sprite.X = sprite.width / 2;
    sprite.velocity.X = sprite.velocity.X * bounce;
  }
  if (sprite.Y + sprite.height / 2 > HEIGHT) {
    sprite.Y = HEIGHT - sprite.height / 2;
    sprite.velocity.Y = sprite.velocity.Y * bounce;
  }
  if (sprite.Y - sprite.height / 2 < 0) {
    sprite.Y = sprite.height / 2;
    sprite.velocity.Y = sprite.velocity.Y * bounce;
  }
};

engine.getInputKeys = (pressedKeys) => {
  if (pressedKeys['w']) {
    sprite.Y = sprite.Y - 1;
  }
  if (pressedKeys['a']) {
    sprite.X = sprite.X - 1;
  }
  if (pressedKeys['s']) {
    sprite.Y = sprite.Y + 1;
  }
  if (pressedKeys['d']) {
    sprite.X = sprite.X + 1;
  }

  if (pressedKeys['ArrowLeft']) {
    sprite.rotateCounterClockWise(5);
  }
  if (pressedKeys['ArrowRight']) {
    sprite.rotateClockWise(5);
  }
  if (pressedKeys['ArrowUp']) {
    sprite.scale(1.01);
  }
  if (pressedKeys['ArrowDown']) {
    sprite.scale(0.99);
  }
};
