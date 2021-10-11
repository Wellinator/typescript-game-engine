import { TileMap } from '../classes/TileMap';

export interface AnimateOptions {
  customTilesMap?: TileMap;
  customframeTime?: number | number[];
  animateInOpositeDirection?: boolean;
}
