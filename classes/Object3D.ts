import { ConstantsService } from '../constants.service';
import { ObjectPosition, Vertex, Vertices } from '../models';
import { Point3D } from './Point3D';

abstract class Object3D {
  public size;
  abstract mesh: Vertices;
  abstract colors: number[][];
  abstract faces: number[][];
  abstract selfProjection: Point3D[] = [];
  public constants: ConstantsService 

  constructor(
    size: number,
  ) {
    this.size = size;
    this.constants = new ConstantsService();
  }

  public rotateX(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      let X = vertex[0];
      let Y = vertex[1];
      let Z = vertex[2];
      return [ 
        X, 
        Y * Math.cos(rad) - Z * Math.sin(rad), 
        Z * Math.cos(rad) + Y * Math.sin(rad)
      ];
    });
    return this;
  }

  public rotateY(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      let X = vertex[0];
      let Y = vertex[1];
      let Z = vertex[2];
      return [
        Z * Math.sin(rad) + X * Math.cos(rad),
        Y,
        Z * Math.cos(rad) - X * Math.sin(rad)
      ];
    });
    return this;
  }

  public rotateZ(angle = 0): Object3D {
    const rad = (angle * Math.PI) / 180;
    this.mesh = this.mesh.map((vertex: Vertex) => {
      let X = vertex[0];
      let Y = vertex[1];
      let Z = vertex[2];
      return [
        X * Math.cos(rad) - Y * Math.sin(rad),
        X * Math.sin(rad) + Y * Math.cos(rad),
        Z
      ];
    });
    return this;
  }

  public project(
    viewWidth: number,
    viewHeight: number,
    fieldOfView: number = 100,
    viewDistance: number = 1
  ): void {
    this.selfProjection = this.mesh.map( vertices => {
      let X = vertices[0];
      let Y = vertices[1];
      let Z = vertices[2];

      const factor = fieldOfView / (viewDistance + Z);
      this.constants.PerspectiveMatrix.forEach( row => {
        X += X * row[0];  
        Y += Y * row[1];
        Z += Z * row[2];  
      })

      X = X * factor + viewWidth / 2;
      Y = Y * factor + viewHeight / 2;
      return new Point3D(X, Y, Z);
    });
  }

  private _getFaceColor(faceIndex: number): string {
    const RGBA = this.colors[faceIndex];

    return `rgba(${RGBA[0] * 255}, ${RGBA[1] * 255}, ${RGBA[2] * 255}, ${RGBA[3]})`;
  }

  public render(context: CanvasRenderingContext2D) {
    let currentFace = 0;
    this.faces.forEach( (face, index) => {

      let _p1 = this.selfProjection[face[0]];
      let _p2 = this.selfProjection[face[1]];
      let _p3 = this.selfProjection[face[2]];

      let _v1 = new Point3D(_p2.X - _p1.X, _p2.Y - _p1.Y, _p2.Z - _p1.Z);
      let _v2 = new Point3D(_p3.X - _p1.X, _p3.Y - _p1.Y, _p3.Z - _p1.Z);

      let n = new Point3D(
        _v1[1] * _v2[2] - _v1[2] * _v2[1],
        _v1[2] * _v2[0] - _v1[0] * _v2[2],
        _v1[0] * _v2[1] - _v1[1] * _v2[0]
      );

      if( 
        ( -_p1.X * n.X + -_p1.Y * n.Y + -_p1.Z * n.Z ) <= 0
      ){
        context.beginPath();
        context.moveTo(this.selfProjection[face[0]].X, this.selfProjection[face[0]].Y)
        context.lineTo(this.selfProjection[face[1]].X, this.selfProjection[face[1]].Y);
        context.lineTo(this.selfProjection[face[2]].X, this.selfProjection[face[2]].Y);
        context.closePath();
  
        context.strokeStyle =  this._getFaceColor(currentFace);
        context.stroke();
        
        context.fillStyle = this._getFaceColor(currentFace);
        context.fill();
      }

      if(index % 2) currentFace += 1;
    });
  }
}

export default Object3D;
