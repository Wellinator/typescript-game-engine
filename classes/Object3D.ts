import { ConstantsService } from '../constants.service';
import { ObjectPosition, Point2D, Point3D, Vertex, Vertices } from '../models';

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
      return { X, Y, Z };
    });
  }

  private _getFaceColor(faceIndex: number): string {
    const RGBA = this.colors[faceIndex];

    return `rgba(${RGBA[0] * 255}, ${RGBA[1] * 255}, ${RGBA[2] * 255}, ${RGBA[3]})`;
  }

  public render(context: CanvasRenderingContext2D) {
    let currentFace = 0;
    this.faces.forEach( (face, index) => {
      context.beginPath();
      context.moveTo(this.selfProjection[face[0]].X, this.selfProjection[face[0]].Y)
      context.lineTo(this.selfProjection[face[1]].X, this.selfProjection[face[1]].Y);
      context.lineTo(this.selfProjection[face[2]].X, this.selfProjection[face[2]].Y);
      context.closePath();

      context.strokeStyle =  this._getFaceColor(currentFace);
      context.stroke();
      
      //context.fillStyle = this._getFaceColor(currentFace);
      //context.fill();

      if(index % 2) currentFace += 1;
    });
  }
}

export default Object3D;
