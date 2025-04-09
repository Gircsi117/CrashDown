export enum CubeType {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

class Cube {
  public type: CubeType;
  public x: number;
  public y: number;
  public readonly size: number;

  public bonus: boolean = false;

  constructor(type: CubeType, x: number, y: number, size: number) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.strokeStyle = "#0c0c0c";
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.type;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.bonus) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        this.x + this.size / 4,
        this.y + this.size / 4,
        this.size / 2,
        this.size / 2
      );
    }

    ctx.restore();
  }

  static randomType(): CubeType {
    return Object.values(CubeType)[
      Math.floor(Math.random() * Object.values(CubeType).length)
    ];
  }

}

export default Cube;
