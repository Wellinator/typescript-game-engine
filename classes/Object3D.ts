import { ConstantsService } from '../constants.service';
import { Vertex, Vertices } from '../models';
import { Point2D } from './Point2D';
import { Point3D } from './Point3D';

abstract class Object3D {
  public size;
  abstract mesh: Point3D[];
  abstract colors: number[][];
  abstract faces: number[][];
  public constants: ConstantsService;

  constructor(size: number) {
    this.size = size;
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
    const _p = new Point3D(point.X, point.Y, point.Z);
    const factor =
      this.constants.fieldOfView / (this.constants.VIEW_DISTANCE + _p.Z);
    this.constants.PerspectiveMatrix.forEach(row => {
      _p.X += _p.X * row[0];
      _p.Y += _p.Y * row[1];
      _p.Z += _p.Z * row[2];
    });
    return new Point2D(
      _p.X * factor + this.constants.WIDTH / 2,
      _p.Y * factor + this.constants.HEIGHT / 2
    );
  }

  public render(context: CanvasRenderingContext2D) {
    let currentFace = 0;
    this.faces.forEach((face, index) => {
      const _p1 = this.mesh[face[0]];
      const _p2 = this.mesh[face[1]];
      const _p3 = this.mesh[face[2]];

      const _v1 = new Point3D(_p2.X - _p1.X, _p2.Y - _p1.Y, _p2.Z - _p1.Z);
      const _v2 = new Point3D(_p3.X - _p1.X, _p3.Y - _p1.Y, _p3.Z - _p1.Z);

      const n = new Point3D(
        _v1.Y * _v2.Z - _v1.Z * _v2.Y,
        _v1.Z * _v2.X - _v1.X * _v2.Z,
        _v1.X * _v2.Y - _v1.Y * _v2.X
      );

      if (-_p1.X * n.X + -_p1.Y * n.Y + -_p1.Z * n.Z <= 0) {
        context.beginPath();
        context.moveTo(this.project3DPoint(_p1).X, this.project3DPoint(_p1).Y);
        context.lineTo(this.project3DPoint(_p2).X, this.project3DPoint(_p2).Y);
        context.lineTo(this.project3DPoint(_p3).X, this.project3DPoint(_p3).Y);
        context.closePath();

        context.strokeStyle = this._getFaceColor(currentFace);
        context.stroke();

        // context.fillStyle = this._getFaceColor(currentFace);
        // context.fill();
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
