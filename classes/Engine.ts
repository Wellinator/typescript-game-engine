import { ConstantsService } from '../services/constants.service';
import { Scene2D } from './Scene';

/**
 * Creates a new Engine.
 * @class
 * @classdesc The Engine class id the core of the applications
 * it handdles the input user keys and update the GameLoop;
 */
export class Engine {

  /**
  * @description Used to store the FPS number;
  * @property {number} _FPS
  * @private
  */
  private _FPS: number = 0;

  /**
  * @description Canvas context to render the objects;
  * @property {CanvasRenderingContext2D} context
  * @private
  */
  private context: CanvasRenderingContext2D;

  /**
  * @description Depencency used to access constants values;
  * @property {ConstantsService} constantsService;
  * @private
  */
  private constantsService: ConstantsService = new ConstantsService();

  /**
  * @description Array of string with the pressed keys;
  * @property {Array<string>} _keysDown;
  * @private
  */
  private _keysDown: string[] = [];

  /**
  * @description Array of string with the held keys;
  * @property {Array<string>} _keysHeld;
  * @private
  */
   private _keysHeld: string[] = [];

  /**
  * @description Stores the width of the Canvas window;
  * @property {number} _WIDTH;
  * @private
  */
  private _WIDTH: number;

  /**
  * @description Stores the height of the Canvas window;
  * @property {number} _HEIGHT;
  * @private
  */
  private _HEIGHT: number;

  /**
  * @description Variable that stores the timestap of the current frame;
  * @property {number} CURRENT_FRAME_TIME;
  * @private
  */
  private CURRENT_FRAME_TIME: number;
  
  /**
  * @description Timeout value in millisenconds to trashold;
  * @property {number} HOLD_KEY_TIMEOUT;
  * @public
  */
  public HOLD_KEY_TIMEOUT: number = 150;

  /**
  * @description Variable that stores the timestap of the last frame;
  * @property {number} PREVIOUS_FRAME_TIME;
  * @private
  */
  private PREVIOUS_FRAME_TIME: number;

  /**
  * @description Variation of time between frames in milliseconds;
  * @property {number} DELTA_TIMESTAMP;
  * @private
  */
  private DELTA_TIMESTAMP: number

  /**
  * @description Maximum of frames per second;
  * @property {number} FPS_LIMIT;
  * @private
  */
  private FPS_LIMIT: number;

  /**
  * @description Maximum call to prevent spiral of death;
  * @property {number} MAX_UPDATE_CALLS;
  * @private
  */
  private MAX_UPDATE_CALLS: number = 300;

  /**
  * @description Value in milliseconds of last time the FPS was updated ;
  * @property {number} LAST_FPS_UPDATE;
  * @private
  */
  private LAST_FPS_UPDATE: number = 0;

   /**
  * @description Integer number of frames accumulated every loop;
  * @property {number} FRAMES_THIS_SECOND;
  * @private
  */
  private FRAMES_THIS_SECOND: number = 0;


  /**
  * @description Constructor of Engine class;
  * @constructor
  * @param {HTMLCanvasElement} canvas Html canvas element.
  * @param {number} width WIDTH of the canvas.
  * @param {number} height HEIGHT of the canvas.
  * @param {number} height FPS limit.
  */
  constructor(
    canvas: HTMLCanvasElement,
    width: number = undefined,
    height: number = undefined,
    fps: number = 60
  ) {
    this.FPS_LIMIT = fps;
    this._WIDTH = width || this.constantsService.WIDTH;
    this._HEIGHT = height || this.constantsService.HEIGHT;
    canvas.width = this._WIDTH;
    canvas.height = this._HEIGHT;
    this.context = canvas.getContext('2d');
    this.context.font = '10px Courier New';
    this.context.lineWidth = this.constantsService.PIXEL_SIZE;
    this.context.strokeStyle = 'white';
    this.context.imageSmoothingEnabled = false;
    this.context.imageSmoothingQuality = 'medium';
    this._initInputSystem();
  }

  /**
  * @description Return the number of milliseconds per frame;
  * @private
  * @property {number} TIME_STEP;
  * @returns {number}
  */
  private get TIME_STEP(): number {
    return 1000 / this.FPS_LIMIT;
  }

  /**
  * @description Initiate the input event listeners;
  * @private
  * @function _initInputSystem
  * @returns {void}
  */
  private _initInputSystem(): void {
    window.document.addEventListener('keydown', (event: KeyboardEvent) => {
      this._keysDown[event.key] = true;
      this.OnPressKey(event.key);
      setTimeout(() => {
        if(!!this._keysDown[event.key]) {
          this._keysHeld[event.key] = true;
          this.OnHoldKey(event.key);
        } 
      }, this.HOLD_KEY_TIMEOUT);
    });
    window.document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.OnUnpressKey(event.key);
      this._keysDown[event.key] = false;
      this._keysHeld[event.key] = false;
    });
  }

  /**
  * @description Clear the canvas screen;
  * @private
  * @function clearFrame
  * @returns {void}
  */
  private clearFrame(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this._WIDTH, this._HEIGHT);
  }

  /**
  * @description Initiate the gameloop;
  * @public
  * @function Init
  */
  public Init(): void {
    this.PREVIOUS_FRAME_TIME = performance.now();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
  * @description The gameloop function, core of the engine;
  * @private
  * @function gameLoop
  * @param {number} timestamp.
  * @returns {void}
  */
  private gameLoop(timestamp: number): void {
    // Request for the next RAF;
    window.requestAnimationFrame(this.gameLoop.bind(this));
    
    this.CURRENT_FRAME_TIME = performance.now();
    this.DELTA_TIMESTAMP = this.CURRENT_FRAME_TIME - this.PREVIOUS_FRAME_TIME;

    //If it's next frame update then draw;
    if (this.DELTA_TIMESTAMP > this.TIME_STEP) {
      //Timestamp variation to update data;

      // Update Elapsed time;
      this.PREVIOUS_FRAME_TIME = this.CURRENT_FRAME_TIME - (this.DELTA_TIMESTAMP % this.TIME_STEP);

      // Clear the canvas frame before redraw;
      this.clearFrame();

      // Get input values
      this.getInputKeys(this._keysDown);

      // Call OnBeforeUpdate, used to prepare values if needed;
      this.OnBeforeUpdate();

      //Update FPS counter;
      if (timestamp > this.LAST_FPS_UPDATE + 1000) {
        this.FPS = this.FRAMES_THIS_SECOND;
        this.LAST_FPS_UPDATE = timestamp;
        this.FRAMES_THIS_SECOND = 0;
      }
      this.FRAMES_THIS_SECOND++;

      let UPDATE_STEP_COUNTER = 0;
      //Fix timestamp varying size

      this.OnUpdate(this.DELTA_TIMESTAMP);

      //Sanity check;
      if (++UPDATE_STEP_COUNTER >= this.MAX_UPDATE_CALLS) {
        //Reset DELTA_TIMESTAMP if the updates exceed the maximum limit calls
        this.DELTA_TIMESTAMP = 0;
      }

      // Calls the draw function after update data;
      this.OnDraw();

      // Call the OnAfterUpdate life cycle function;
      this.OnAfterUpdate();
    }
  }

  /**
  * @description Function to get all the pressed keys;
  * @public
  * @function getInputKeys;
  * @param {Array<string>} keysPressed;
  * @returns {Array<string>} All the current pressed keys;
  */  
  public getInputKeys(keysPressed: string[], keysHeld: string[]): {keysPressed: string[]; keysHeld: string[]} {
    return {keysPressed, keysHeld};
  }

  
  /**
  * @description Function called every time a key id pressed;
  * @public
  * @function OnPressKey;
  * @param {string} pressedKey a single pressed key;
  * @returns {string} Pressed key;
  */
  public OnPressKey(pressedKey: string): string {
    return pressedKey;
  }
  
  /**
  * @description Function called every time a key is held;
  * @public
  * @function OnPressKey;
  * @param {string} heldKey a single pressed key;
  * @returns {string} Held key;
  */
  public OnHoldKey(heldKey: string): string {
    return heldKey;
  }

  /**
  * @description Function called every time a key is unpressed;
  * @public
  * @function OnUnpressKey;
  * @param {string} unpressedKey a single unpressed key;
  * @returns {string} Unpressed key;
  */
  public OnUnpressKey(unpressedKey: string): string {
    return unpressedKey;
  }


  /**
  * @description This function is called before every update;
  * @public
  * @function OnBeforeUpdate;
  */
  public OnBeforeUpdate() {
    return;
  }

  /**
  * @description This function is called every frameupdate, commonly used to update game data state;
  * @public
  * @param {number} deltaTime variation of time in milliseconds since laste frame update;
  * @function OnUpdate;
  */
  public OnUpdate(deltaTime: number) {
    return;
  }

  /**
  * @description This function is called after OnUpdate, used to render updated data;
  * @public
  * @function OnDraw;
  */
  public OnDraw(): void {
    return;
  }

  /**
  * @description This function is called in the end of the life cycle;
  * @public
  * @function OnAfterUpdate;
  */
  public OnAfterUpdate() {
    return;
  }

  /**
  * @description Getter of FPS
  * @type {number} FPS;
  * @public
  */
  public get FPS(): number {
    return this._FPS;
  }

  /**
  * @description Private setter of FPS
  * @type {number};
  * @private
  */
  private set FPS(value: number) {
    this._FPS = value;
  }

  /**
  * @description Crates a new 2D Scene with the current context;
  * @public
  * @function create2DScene;
  * @returns {Scene2D} Scene2D;
  */
  public create2DScene(): Scene2D {
    return new Scene2D(this.context);
  }
}
