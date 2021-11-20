import { Point2D } from './primitives/Point2D';
import { Vector2 } from './primitives/Vector2';

abstract class Object2D {
  abstract width: number;
  abstract height: number;
  abstract mesh: Point2D[];
  abstract size: number;
  private _position: Vector2 = new Vector2(0, 0);
  private _velocity: Vector2 = new Vector2(0, 0);
  private _acceleration: Vector2 = new Vector2(0, 0);
  private _gravity: Vector2 = new Vector2(0, 0);
  private _mass: number = 1;
  private _friction: number = 1;
  private _collidable: boolean = true;
  private _hasCollided: boolean = false;

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  public set hasCollided(value: boolean) {
    this._hasCollided = value;
  }

  get isCollidable(): boolean {
    return this._collidable;
  }

  set collidable(value: boolean) {
    this._collidable = value;
  }

  protected get hitBoxColor(): string {
    if (this.isCollidable) {
      return this.hasCollided ? '#FF0000' : '#03FC1C';
    }
    return '#0000FF';
  }

  public get X(): number {
    return this._position.X;
  }

  public set X(value: number) {
    this._position.X = value;
  }

  public get Y(): number {
    return this._position.Y;
  }

  public set Y(value: number) {
    this._position.Y = value;
  }

  public get position(): Vector2 {
    return this._position;
  }

  public set position(position: Vector2) {
    this._position = position;
  }

  public get velocity(): Vector2 {
    return this._velocity;
  }

  public set velocity(velocityVector: Vector2) {
    this._velocity.setLength(velocityVector.length);
  }

  public get acceleration(): Vector2 {
    return this._acceleration;
  }

  public set acceleration(accelerationVector: Vector2) {
    this._acceleration = accelerationVector;
  }

  public get mass(): number {
    return this._mass;
  }

  public set mass(value: number) {
    this._mass = value;
  }

  public get gravity(): Vector2 {
    return this._gravity;
  }

  public set gravity(gravity: Vector2) {
    this._gravity = gravity;
  }

  public get friction(): number {
    return this._friction;
  }

  public set friction(value: number) {
    this._friction = value;
  }

  public get positionVector(): Vector2 {
    return this._position;
  }

  public setDirection(angle: number): Object2D {
    this.velocity.toAngle(angle);
    return this;
  }

  public rotateClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) - (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.X - this.X) * Math.sin(rad) + (point.Y - this.Y) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  public rotateCounterClockWise(angle = 0): Object2D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point2D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) + (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.X - this.X) * -Math.sin(rad) +
        (point.Y - this.Y) * Math.cos(rad);
      return new Point2D(X + this.X, Y + this.Y);
    });
    return this;
  }

  /**
   * Draw the Sprite to its context.
   * @function
   * @public
   * @returns Sprite
   */
  abstract draw(): ThisType<Object2D>

  public translate(X: number, Y: number): Object2D {
    this.mesh = this.mesh.map((point: Point2D) => {
      point.X = point.X - this.X + X;
      point.Y = point.Y - this.Y + Y;
      return point;
    });
    this.X = X;
    this.Y = Y;
    return this;
  }

  public scale(scalingFactor: number): Object2D {
    this.size *= scalingFactor;
    this.mesh.map((point) => {
      point.X = (point.X - this.X) * scalingFactor + this.X;
      point.Y = (point.Y - this.Y) * scalingFactor + this.Y;
      return point;
    });
    return this;
  }

  public accelerate(
    accelerationVector: Vector2 = this._acceleration
  ): Object2D {
    this._acceleration = accelerationVector;
    this.velocity.addedTo(accelerationVector);
    return this;
  }

  public angleToObject(object: Object2D): number {
    return Math.atan2(object.Y - this.Y, object.X - this.X);
  }

  public distanceToObject(object: Object2D): number {
    const _dx = object.X - this.X;
    const _dy = object.Y - this.Y;
    return Math.sqrt(_dx * _dx + _dy * _dy);
  }

  public gravitateToObject(object: Object2D): Object2D {
    const grav = new Vector2(0, 0);
    const distance = this.distanceToObject(object);
    grav.setLength(object.mass / (distance * distance));
    grav.toAngle(this.angleToObject(object));
    this.velocity.addedTo(grav);
    return this;
  }

  public gravitate(gravityValue: number): Object2D {
    this._gravity.Y = gravityValue;
    return this;
  }

  public moveUp(speed: number = 1) {
    this.setDirection((3 * Math.PI) / 2);
    this.velocity.multipliedBy(speed);
  }

  public moveDown(speed: number = 1) {
    this.setDirection(Math.PI / 2);
    this.velocity.multipliedBy(speed);
  }

  public moveLeft(speed: number = 1) {
    this.setDirection(Math.PI);
    this.velocity.multipliedBy(speed);
  }

  public moveRight(speed: number = 1) {
    this.setDirection(Math.PI * 2);
    this.velocity.multipliedBy(speed);
  }

  public update(deltaTimestamp: number): void {
    this.OnBeforeUpdate(deltaTimestamp);
    this.OnUpdate(deltaTimestamp);
    this.OnAfterUpdate(deltaTimestamp);
  }

  public OnBeforeUpdate(deltaTimestamp: number) {
    return;
  }

  public OnUpdate(deltaTimestamp: number) {
    return;
  }

  public OnAfterUpdate(deltaTimestamp: number) {
    return;
  }
}

export default Object2D;
