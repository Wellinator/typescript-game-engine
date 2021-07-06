export class ConstantsService {
  public get PerspectiveMatrix(): number[][] {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
  }

  public RotateXMatrix(angle: number): number[][] {
    return [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)]
    ];
  }

  public RotateYMatrix(angle: number): number[][] {
    return [
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)]
    ];
  }

  public RotateZMatrix(angle: number): number[][] {
    return [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1]
    ];
  }
}
