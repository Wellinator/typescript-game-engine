import Object3D from "../classes/Object3D";
import { Point3D } from "../classes/primitives/Point3D";

export class Cube extends Object3D {
  public X: number;
  public Y: number;
  public Z: number;
  public mesh: Point3D[];

  constructor(
    X: number, 
    Y: number, 
    Z: number, 
    size: number
  ) {
    super(X, Y, Z, size);
    this.size = size * 0.5;
    this.X = X;
    this.Y = Y;
    this.Z = Z;

    this.mesh = [
      new Point3D(X - this.size, Y + this.size, Z - this.size),
      new Point3D(X + this.size, Y + this.size, Z - this.size),
      new Point3D(X + this.size, Y - this.size, Z - this.size),
      new Point3D(X - this.size, Y - this.size, Z - this.size),
      new Point3D(X - this.size, Y - this.size, Z + this.size),
      new Point3D(X + this.size, Y - this.size, Z + this.size),
      new Point3D(X + this.size, Y + this.size, Z + this.size),
      new Point3D(X - this.size, Y + this.size, Z + this.size),
    ];
  }

  faces = [
    [0, 2, 1], [0, 3, 2], // Front
    [2, 3, 4], [2, 4, 5], // Top
    [1, 2, 5], [1, 5, 6], // Right
    [0, 7, 4], [0, 4, 3], // Left
    [5, 4, 7], [5, 7, 6], // Back
    [0, 6, 7], [0, 1, 6], // Bottom
  ];

  colors: number[][] = [
    [1.0, 1.0, 1.0, 1.0], // Front face: white
    [1.0, 0.0, 0.0, 1.0], // Back face: red
    [0.0, 1.0, 0.0, 1.0], // Top face: green
    [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
    [1.0, 1.0, 0.0, 1.0], // Right face: yellow
    [1.0, 0.0, 1.0, 1.0]  // Left face: purple
  ];
}
