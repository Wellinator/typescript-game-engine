import { Tile } from './Tile';

export class TileMap {
  private _tilesMap?: Tile[] = [];
  private _atlas: HTMLImageElement;
  private _tileWidth: number;
  private _tileHeight: number;
  private _currentTileIndex: number = 0;

  constructor(tileAtlas: string, tileWidth: number, tileHeight: number) {
    this._tileWidth = tileWidth;
    this._tileHeight = tileHeight;
    this._atlas = this._createFrameFromAtlas(tileAtlas);
    this._populateTileMap(this._atlas);
  }

  public get currentTile(): Tile {
    return this._tilesMap[this._currentTileIndex];
  }

  public get tileIndex(): number {
    return this._currentTileIndex;
  }

  public get tileWidth(): number {
    return this._tileWidth;
  }

  public get tileHeight(): number {
    return this._tileHeight;
  }

  public get tilesMap(): Tile[] {
    return this._tilesMap;
  }

  private _createFrameFromAtlas(paths: string): HTMLImageElement {
    const atlas = new Image();
    atlas.src = paths;
    return atlas;
  }

  private _isAtlasColumnsOrRowsOriented(): boolean {
    return (
      this._tileWidth < this._atlas.naturalWidth ||
      this._tileHeight < this._atlas.naturalHeight
    );
  }

  private _populateTileMap(atlas: HTMLImageElement): void {
    if (this._isAtlasColumnsOrRowsOriented) {
      for (let i = 0; i < atlas.naturalWidth / this.tileWidth; i++) {
        for (let j = 0; j < atlas.naturalHeight / this.tileHeight; j++) {
          this._tilesMap.push(
            new Tile(
              this.tileWidth * i,
              this.tileHeight * j,
              this.tileWidth,
              this.tileHeight,
              this._atlas
            )
          );
        }
      }
      return;
    }

    this._tilesMap = new Array<Tile>(
      new Tile(0, 0, this.tileWidth, this.tileHeight, this._atlas)
    );
  }

  public nextTile() {
    if (!!this._tilesMap[this._currentTileIndex + 1]) {
      return this._currentTileIndex++;
    }
    return (this._currentTileIndex = 0);
  }

  public previousTile() {
    if (!!this._tilesMap[this._currentTileIndex - 1]) {
      return this._currentTileIndex--;
    }
    return (this._currentTileIndex = this._tilesMap.length);
  }
}
