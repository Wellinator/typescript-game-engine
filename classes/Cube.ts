import Object3D from './Object3D';
import { Point3D } from './Point3D';

export class Cube extends Object3D {
  private X: number;
  private Y: number;
  private Z: number;
  public mesh: Point3D[];

  constructor(X: number, Y: number, Z: number, size: number) {
    super(size);
    this.X = X;
    this.Y = Y;
    this.Z = Z;

    this.mesh = [
      // Front face
      new Point3D(this.X - this.size, this.Y - this.size, this.Z + this.size),
      new Point3D(this.X + this.size, this.Y - this.size, this.Z + this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z + this.size),
      new Point3D(this.X - this.size, this.Y + this.size, this.Z + this.size),

      // Back face
      new Point3D(this.X - this.size, this.Y - this.size, this.Z - this.size),
      new Point3D(this.X - this.size, this.Y + this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y - this.size, this.Z - this.size),

      // Top face
      new Point3D(this.X - this.size, this.Y + this.size, this.Z - this.size),
      new Point3D(this.X - this.size, this.Y + this.size, this.Z + this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z + this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z - this.size),

      // Bottom face
      new Point3D(this.X - this.size, this.Y - this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y - this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y - this.size, this.Z + this.size),
      new Point3D(this.X - this.size, this.Y - this.size, this.Z + this.size),

      // Right face
      new Point3D(this.X + this.size, this.Y - this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z - this.size),
      new Point3D(this.X + this.size, this.Y + this.size, this.Z + this.size),
      new Point3D(this.X + this.size, this.Y - this.size, this.Z + this.size),

      // Left face
      new Point3D(this.X - this.size, this.Y - this.size, this.Z - this.size),
      new Point3D(this.X - this.size, this.Y - this.size, this.Z + this.size),
      new Point3D(this.X - this.size, this.Y + this.size, this.Z + this.size),
      new Point3D(this.X - this.size, this.Y + this.size, this.Z - this.size)
    ];
  }

  faces = [
    [0, 1, 2],
    [0, 2, 3], // front
    [4, 5, 6],
    [4, 6, 7], // back
    [8, 9, 10],
    [8, 10, 11], // top
    [12, 13, 14],
    [12, 14, 15], // bottom
    [16, 17, 18],
    [16, 18, 19], // right
    [20, 21, 22],
    [20, 22, 23] // left
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
