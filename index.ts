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
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAQCAYAAADpunr5AAAAAXNSR0IArs4c6QAAAhFJREFUWEftWLFKBEEMnQM5e+0srhasBLGw8BtEO0vBD7CzthP8A3s7xW+wsBDBSrC+wk57D0HJwTtyMZnN7GRUxGlud++SyXsvyWRvkP7XjzIwaLX70nD4wX2/TibN9mqFocavF38TUmjzh73NNNrenWIY31yl9cu7VCICB1BiV0NalG0J/nABsLkGxiMCiCcB+SJbWl4xvBkYRTr8lOJvJsDo4jqN93emceG6SwAZPK8gAPT4oN/WCthHGIr/5e15Zsrx4+Hy4spcEoUKwAnUBKAgLAJzmSPJ8ProI2Af4nn2kwBEMn1yAfDszwoQISAnv08L+1UVYGWSlr1fWg9rX/DDK0qrpCgBas4gTwwSf7MWBJJkP24hQISAFGftGSTtMTjw8+jbBKCNsLG8lpOMJ3Ny50CEACUxeM4gkI+4ORccf9MK8I6iGngLgDYNlZBnTVPWAKG1wF8rgFbGcpa35nhOAK8YTpiVRVbpywSwWkFEBYW+B8gJAM7PTk/SwdFxtmpKX0R44OerW2lj7T07Cd4/LqTDp9u5WZr29NjCsfQRUUEhAvAJADM0HOPvBLrPvY32FaCreqzW4QHe9R5hCagdouRLSwJPHFrrmmWzN4u6NqdMpCUzmexoyeyVFaDZ8szVfCD2nG3OR629B4OFf4CsB3HZ+mdfEpGohlIfNbYIAT7ovjR26aPGnrpBDf5Pa+ZqLwUK+EkAAAAASUVORK5CYII=`
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
