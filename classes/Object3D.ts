import { ConstantsService } from '../constants.service';
import { Point2D } from './Point2D';
import { Point3D } from './Point3D';

abstract class Object3D {
  public size: number;
  abstract mesh: Point3D[];
  abstract colors: number[][];
  abstract faces: number[][];
  public constants: ConstantsService;

  constructor() {
    this.constants = new ConstantsService();
  }

  public rotateX(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      return new Point3D(
        point.X,
        point.Y * Math.cos(rad) - point.Z * Math.sin(rad),
        point.Z * Math.cos(rad) + point.Y * Math.sin(rad)
      );
    });
    return this;
  }

  public rotateY(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      return new Point3D(
        point.Z * Math.sin(rad) + point.X * Math.cos(rad),
        point.Y,
        point.Z * Math.cos(rad) - point.X * Math.sin(rad)
      );
    });
    return this;
  }

  public rotateZ(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((point: Point3D) => {
      return new Point3D(
        point.X * Math.cos(rad) - point.Y * Math.sin(rad),
        point.X * Math.sin(rad) + point.Y * Math.cos(rad),
        point.Z
      );
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
      const vertice1 = this.mesh[face[0]];
      const vertice2 = this.mesh[face[1]];
      const vertice3 = this.mesh[face[2]];

      const _v1 = new Point3D(vertice2.X - vertice1.X, vertice2.Y - vertice1.Y, vertice2.Z - vertice1.Z);
      const _v2 = new Point3D(vertice3.X - vertice1.X, vertice3.Y - vertice1.Y, vertice3.Z - vertice1.Z);

      const n = new Point3D(
        _v1.Y * _v2.Z - _v1.Z * _v2.Y,
        _v1.Z * _v2.X - _v1.X * _v2.Z,
        _v1.X * _v2.Y - _v1.Y * _v2.X
      );

      if (-vertice1.X * n.X + -vertice1.Y * n.Y + -vertice1.Z * n.Z >= 0) {
        context.beginPath();
        context.moveTo(this.project3DPoint(vertice1).X, this.project3DPoint(vertice1).Y);
        context.lineTo(this.project3DPoint(vertice2).X, this.project3DPoint(vertice2).Y);
        context.lineTo(this.project3DPoint(vertice3).X, this.project3DPoint(vertice3).Y);
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
