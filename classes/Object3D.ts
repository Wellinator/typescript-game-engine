import { ConstantsService } from '../constants.service';
import { Vertex, Vertices } from '../models';
import { Point2D } from './Point2D';
import { Point3D } from './Point3D';

abstract class Object3D {
  public size;
  abstract mesh: Vertices;
  abstract colors: number[][];
  abstract faces: number[][];
  public constants: ConstantsService;

  constructor(size: number) {
    this.size = size;
    this.constants = new ConstantsService();
  }

  public rotateX(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      const point = new Point3D(vertex[0], vertex[1], vertex[2]);

      return [
        point.X,
        point.Y * Math.cos(rad) - point.Z * Math.sin(rad),
        point.Z * Math.cos(rad) + point.Y * Math.sin(rad)
      ];
    });
    return this;
  }

  public rotateY(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      const point = new Point3D(vertex[0], vertex[1], vertex[2]);
      return [
        point.Z * Math.sin(rad) + point.X * Math.cos(rad),
        point.Y,
        point.Z * Math.cos(rad) - point.X * Math.sin(rad)
      ];
    });
    return this;
  }

  public rotateZ(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      const point = new Point3D(vertex[0], vertex[1], vertex[2]);
      return [
        point.X * Math.cos(rad) - point.Y * Math.sin(rad),
        point.X * Math.sin(rad) + point.Y * Math.cos(rad),
        point.Z
      ];
    });
    return this;
  }

  public project3DPoint(point: Point3D): Point2D {
    const factor =
      this.constants.fieldOfView / (this.constants.VIEW_DISTANCE + point.Z);
    this.constants.PerspectiveMatrix.forEach(row => {
      point.X += point.X * row[0];
      point.Y += point.Y * row[1];
      point.Z += point.Z * row[2];
    });
    point.X = point.X * factor + this.constants.WIDTH / 2;
    point.Y = point.Y * factor + this.constants.HEIGHT / 2;
    return new Point2D(point.X, point.Y);
  }

  public render(context: CanvasRenderingContext2D) {
    let currentFace = 0;
    this.faces.forEach((face, index) => {
      let _p1 = new Point3D(
        this.mesh[face[0]][0] * this.size,
        this.mesh[face[0]][1] * this.size,
        this.mesh[face[0]][2] * this.size
      );
      let _p2 = new Point3D(
        this.mesh[face[1]][0] * this.size,
        this.mesh[face[1]][1] * this.size,
        this.mesh[face[1]][2] * this.size
      );
      let _p3 = new Point3D(
        this.mesh[face[2]][0] * this.size,
        this.mesh[face[2]][1] * this.size,
        this.mesh[face[2]][2] * this.size
      );

      let _v1 = new Point3D(_p2.X - _p1.X, _p2.Y - _p1.Y, _p2.Z - _p1.Z);
      let _v2 = new Point3D(_p3.X - _p1.X, _p3.Y - _p1.Y, _p3.Z - _p1.Z);

      let n = new Point3D(
        _v1.Y * _v2.Z - _v1.Z * _v2.Y,
        _v1.Z * _v2.X - _v1.X * _v2.Z,
        _v1.X * _v2.Y - _v1.Y * _v2.X
      );

      if (-_p1.X * n.X + -_p1.Y * n.Y + -_p1.Z * n.Z >= 0) {
        context.beginPath();
        context.moveTo(_p1.X, _p1.Y);
        context.lineTo(_p2.X, _p2.Y);
        context.lineTo(_p3.X, _p3.Y);
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
