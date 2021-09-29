import { Engine } from './classes/Engine';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const bounce = -0.95

//Create Engine;
const engine = new Engine(canvas, WIDTH, HEIGHT, 144);

//Create a 2D scene;
const scene = engine.create2DScene();

//Create asimple Sprite
const sprite = scene.createSprite(
  WIDTH / 2,
  51,
  100,
  100,
  16,
  16,
  'https://cdn.jsdelivr.net/gh/Wellinator/javascript-3d-engine@sprite-animation/aprite_atlas.png'
);


sprite.setDirection((11 * Math.PI) / 6);
sprite.velocity.setLength(20);
sprite.gravitate(100);
sprite.friction = .995;

sprite.OnUpdate = (deltaTimestamp) => {
  sprite.velocity.multipliedBy(sprite.friction);
  sprite.velocity.addedTo(sprite.gravity);
  sprite.position.addedTo(sprite.velocity.multiply(deltaTimestamp / 1000));
};

engine.OnDraw = () => {
  sprite.drawTile(0);
}

scene.addSprite(sprite);

engine.OnUpdate = (deltaTimestamp) => {
  scene.update(deltaTimestamp);
  scene.print(10, 20, engine.FPS);
  scene.print(10, 45, deltaTimestamp / 1000);

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
  
  return pressedKeys;
};
