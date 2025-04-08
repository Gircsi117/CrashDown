import App from "./app.module.js";
import Cube, { CubeType } from "./cube.module.js";
import { GAME_CANVAS, GAME_FIELD, MAIN_MENU_PAGE } from "./items.module.js";

class Game {
  private static _instance: Game;

  private readonly cubeSize: number;
  private readonly rowCount: number = 25;
  private readonly columnCount: number = 15;

  private readonly ctx: CanvasRenderingContext2D;
  public score = 0;

  private cubes: Cube[] = [];

  public static get instance() {
    if (!Game._instance) Game._instance = new Game();
    return Game._instance;
  }

  private constructor() {
    const { width, height } = GAME_FIELD.getBoundingClientRect();

    let size = Math.floor(height / this.rowCount);

    while (size * this.columnCount > width) {
      size--;
    }

    GAME_CANVAS.style.width = `${size * this.columnCount}px`;
    GAME_CANVAS.style.height = `${size * this.rowCount}px`;

    GAME_CANVAS.width = size * this.columnCount;
    GAME_CANVAS.height = size * this.rowCount;

    this.ctx = GAME_CANVAS.getContext("2d") as CanvasRenderingContext2D;
    this.cubeSize = size;
  }

  public start() {
    this.addRow(3);
    GAME_CANVAS.addEventListener("click", this.checkClick.bind(this));
    this.animate();
  }

  public restart() {
    Game._instance = new Game();
    Game.instance.start();
  }

  public exit() {
    App.instance.setPage(MAIN_MENU_PAGE);

    GAME_CANVAS.removeEventListener("click", this.checkClick.bind(this));
  }

  private drawBackground() {
    this.ctx.clearRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#0c0c0c";
    this.ctx.lineWidth = 1;

    for (let i = 0; i < GAME_CANVAS.height; i += this.cubeSize) {
      for (let j = 0; j < GAME_CANVAS.width; j += this.cubeSize) {
        this.ctx.strokeRect(j, i, this.cubeSize, this.cubeSize);
      }
    }
    this.ctx.closePath();
  }

  private drawCubes() {
    this.cubes.forEach((cube) => cube.draw(this.ctx));
  }

  private animate() {
    this.drawBackground();
    this.drawCubes();

    requestAnimationFrame(() => this.animate());
  }

  private addRow(rowCount: number = 1) {
    this.cubes.forEach((cube) => (cube.y -= this.cubeSize));

    for (let i = 0; i < this.columnCount; i++) {
      this.cubes.push(
        new Cube(
          Cube.randomType(),
          i * this.cubeSize,
          this.cubeSize * (this.rowCount - 1),
          this.cubeSize
        )
      );
    }

    if (rowCount > 1) this.addRow(rowCount - 1);
  }

  public removeCube(cube: Cube) {
    this.cubes = this.cubes.filter((c) => c !== cube);
  }

  public checkClick = (e: MouseEvent) => {
    const { clientX, clientY, pageX, pageY } = e;

    const x =
      Math.floor((clientX - GAME_CANVAS.offsetLeft) / this.cubeSize) *
      this.cubeSize;
    const y =
      Math.floor((clientY - GAME_CANVAS.offsetTop) / this.cubeSize) *
      this.cubeSize;

    const cube = this.cubes.find((cube) => cube.x === x && cube.y === y);

    if (!cube) return;

    const collisions = this.getCollisions(cube);

    console.log(collisions);

    if (collisions.length < 3) return;

    collisions.forEach((collision) => this.removeCube(collision));

    this.fallCubes();

    this.addRow();

    this.score += collisions.length;

    if (this.cubes.find((cube) => cube.y < 0)) this.exit();
  };

  private getCollisions(cube: Cube): Cube[] {
    const result: Cube[] = [cube];

    for (let i = 0; i < result.length; i++) {
      const current = result[i];

      const neighbors = this.getNeighbors(current).filter(
        (n) => n.type === current.type && !result.includes(n)
      );

      result.push(...neighbors);
    }

    return result;
  }

  private getNeighbors(cube: Cube): Cube[] {
    const top = this.cubes.find(
      (c) => c.x === cube.x && c.y === cube.y - this.cubeSize
    );
    const bottom = this.cubes.find(
      (c) => c.x === cube.x && c.y === cube.y + this.cubeSize
    );
    const left = this.cubes.find(
      (c) => c.x === cube.x - this.cubeSize && c.y === cube.y
    );
    const right = this.cubes.find(
      (c) => c.x === cube.x + this.cubeSize && c.y === cube.y
    );

    return [top, bottom, left, right].filter((c) => c != undefined);
  }

  private fallCubes() {}
}

export default Game;
