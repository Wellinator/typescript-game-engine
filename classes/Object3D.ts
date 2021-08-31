import { ConstantsService } from '../constants.service';
import { Point2D } from './Point2D';
import { Point3D } from './Point3D';

abstract class Object3D {
  public size: number;
  abstract mesh: Point3D[];
  abstract colors: number[][];
  abstract faces: number[][];
  public constants: ConstantsService;
  abstract X: number;
  abstract Y: number;
  abstract Z: number;

  constructor(
    X: number, 
    Y: number, 
    Z: number, 
    size: number
  ) {
    this.constants = new ConstantsService();
    this.size = size;
  }

  public rotateX(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      const Y =
        (point.Y - this.Y) * Math.cos(rad) - (point.Z - this.Z) * Math.sin(rad);
      const Z =
        (point.Z - this.Z) * Math.cos(rad) + (point.Y - this.Y) * Math.sin(rad);

      return new Point3D(point.X, Y + this.Y, Z + this.Z);
    });
    return this;
  }

  public rotateY(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      const X =
        (point.Z - this.Z) * Math.sin(rad) + (point.X - this.X) * Math.cos(rad);
      const Z =
        (point.Z - this.Z) * Math.cos(rad) - (point.X - this.X) * Math.sin(rad);
      return new Point3D(X + this.X, point.Y, Z + this.Z);
    });
    return this;
  }

  public rotateZ(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      const X =
        (point.X - this.X) * Math.cos(rad) - (point.Y - this.Y) * Math.sin(rad);
      const Y =
        (point.X - this.X) * Math.sin(rad) + (point.Y - this.Y) * Math.cos(rad);
      return new Point3D(X + this.X, Y + this.Y, point.Z);
    });
    return this;
  }

  public project3DPoint(point: Point3D): Point2D {
    const factor =
      this.constants.FIELD_OF_VIEW / (this.constants.VIEW_DISTANCE + point.Z);
    return new Point2D(
      point.X * factor + this.constants.WIDTH / 2,
      point.Y * factor + this.constants.HEIGHT / 2
    );
  }

  public render(context: CanvasRenderingContext2D) {
    let currentFace = 0;
    this.faces.forEach((face, index) => {
      const vertexA = this.mesh[face[0]];
      const vertexB = this.mesh[face[1]];
      const vertexC = this.mesh[face[2]];

      const vectorA = new Point3D(
        vertexB.X - vertexA.X,
        vertexB.Y - vertexA.Y,
        vertexB.Z - vertexA.Z
      );
      const vectorB = new Point3D(
        vertexC.X - vertexA.X,
        vertexC.Y - vertexA.Y,
        vertexC.Z - vertexA.Z
      );

      const normalVector = vectorA.crossProduct(vectorB);
      const canDrawFace = vertexA.X * normalVector.X + vertexA.Y * normalVector.Y + vertexA.Z * normalVector.Z > 0;

      if (canDrawFace) {
        context.beginPath();
        context.moveTo(
          this.project3DPoint(vertexA).X,
          this.project3DPoint(vertexA).Y
        );
        context.lineTo(
          this.project3DPoint(vertexB).X,
          this.project3DPoint(vertexB).Y
        );
        context.lineTo(
          this.project3DPoint(vertexC).X,
          this.project3DPoint(vertexC).Y
        );
        context.closePath();

        context.strokeStyle = this._getFaceColor(currentFace);
        context.stroke();

        context.fillStyle = this._getFaceColor(currentFace);
        context.fill();
      }

      if (index % 2) currentFace += 1;
    });
  }

  private _getFaceColor(faceIndex: number): string {
    const RGBA = this.colors[faceIndex];

    return `rgba(${RGBA[0] * 255}, ${RGBA[1] * 255}, ${RGBA[2] * 255}, ${
      RGBA[3]
    })`;
  }
}

export default Object3D;
