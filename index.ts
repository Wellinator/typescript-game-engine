import { Engine } from './classes/Engine';

const canvas: HTMLCanvasElement = document.querySelector('canvas');
const WIDTH = window.innerWidth - 25;
const HEIGHT = window.innerHeight - 25;
const bounce = -0.8;

//Create Engine;
const engine = new Engine(canvas, WIDTH, HEIGHT, 60);

//Create a 2D scene;
const scene = engine.create2DScene();

fetch(
  'https://raw.githubusercontent.com/Wellinator/javascript-3d-engine/sprite-animation/samples/aprite_atlas.png'
).then((res) => {
  res.blob().then((blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64Asset = reader.result;

      //Generate sprites
      for (let i = 0; i < 20; i++) {
        let tempSprite = scene.createSprite(
          Math.floor(Math.random() * WIDTH),
          Math.floor(Math.random() * HEIGHT),
          25,
          25,
          16,
          16,
          base64Asset
        );
        scene.addObjectToScene(tempSprite);
      }

      //Create asimple Sprite
      const sprite = scene.createSprite(0, 0, 25, 25, 16, 16, base64Asset);

      //sprite.setDirection((11 * Math.PI) / 6);
      //sprite.velocity.setLength(0);
      //sprite.gravitate(50);
      sprite.friction = 0.9;

      sprite.OnUpdate = (deltaTimestamp) => {
        sprite.velocity.multipliedBy(sprite.friction);
        sprite.velocity.addedTo(sprite.gravity);
        sprite.position.addedTo(
          sprite.velocity.multiply(deltaTimestamp / 1000)
        );
        sprite.animate(deltaTimestamp);
      };

      engine.OnDraw = () => {
        scene.draw();
      };

      engine.OnUpdate = (deltaTimestamp) => {
        scene.update(deltaTimestamp);
        scene.print(10, 20, engine.FPS);
        scene.print(10, 45, deltaTimestamp / 1000);
        scene.print(10, 70, Math.round(sprite.X));
        scene.print(50, 70, Math.round(sprite.Y));

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
          sprite.velocity.setLength(150);
          sprite.moveUp();
        }
        if (pressedKeys['a']) {
          sprite.velocity.setLength(100);
          sprite.moveLeft();
        }
        if (pressedKeys['s']) {
          sprite.velocity.setLength(100);
          sprite.moveDown();
        }
        if (pressedKeys['d']) {
          sprite.velocity.setLength(100);
          sprite.moveRight();
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

      scene.addObjectToScene(sprite);
      engine.Init();
    };
  });
});
