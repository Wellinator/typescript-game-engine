import Object3D from './Object3D';
import { Point3D } from './Point3D';

export class Cube extends Object3D {
  private X: number;
  private Y: number;
  private Z: number;
  public mesh: Point3D[];

  constructor(X: number, Y: number, Z: number, size: number) {
    super();
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.size = size;

    this.mesh = [
      new Point3D(X - size, Y - size, Z + size),
      new Point3D(X + size, Y - size, Z + size),
      new Point3D(X + size, Y + size, Z + size),
      new Point3D(X - size, Y + size, Z + size),
      new Point3D(X - size, Y - size, Z - size),
      new Point3D(X + size, Y - size, Z - size),
      new Point3D(X + size, Y + size, Z - size),
      new Point3D(X - size, Y + size, Z - size),
    ];
  }

  faces = [
    [0, 2, 1], [2, 3, 1], // Front
    [4, 5, 7], [4, 7, 6], // Back
    [2, 6, 3], [3, 6, 7], // Top
    [2, 3, 7], [2, 6, 7], // Bottom
    [1, 2, 6], [1, 5, 6], // Right
    [0, 3, 7], [0, 4, 7], // Left
  ];

  colors: number[][] = [
    [1.0, 1.0, 1.0, 1.0], // Front face: white
    [1.0, 0.0, 0.0, 1.0], // Back face: red
    [0.0, 1.0, 0.0, 1.0], // Top face: green
    [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
    [1.0, 1.0, 0.0, 1.0], // Right face: yellow
    [1.0, 0.0, 1.0, 1.0] // Left face: purple
  ];
}
