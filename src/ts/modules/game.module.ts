import App from "./app.module.js";
import Cube from "./cube.module.js";
import {
  BREAK_EFFECT,
  GAME_CANVAS,
  GAME_FIELD,
  GAME_OVER_DIALOG,
  GAME_OVER_MESSAGE,
  MAIN_MENU_PAGE,
  SCORE,
  TIME,
} from "./items.module.js";

class Game {
  private static _instance: Game;

  private readonly cubeSize: number;
  private readonly rowCount: number = 25;
  private readonly columnCount: number = 15;

  private readonly ctx: CanvasRenderingContext2D;
  private _score: number = 0;
  private _bonusCounter: number = 0;
  private _time: number = 60;

  private timer: number = 0;

  private clickable = true;

  private cubes: Cube[] = [];

  private readonly localClick: (e: MouseEvent) => void;

  public get score() {
    return this._score;
  }

  public set score(score: number) {
    this._score = score;
    SCORE.textContent = this.score.toString();
  }

  public get time() {
    return this._time;
  }

  public set time(time: number) {
    this._time = time;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    TIME.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  public get bonusCounter() {
    return this._bonusCounter;
  }

  public set bonusCounter(counter: number) {
    this._bonusCounter = counter;

    if (this.bonusCounter >= 500) {
      const filteredCubes = this.cubes.filter((cube) => !cube.bonus);

      const randomCube =
        filteredCubes[Math.floor(Math.random() * filteredCubes.length)];

      randomCube.bonus = true;
      this.bonusCounter -= 500;
    }
  }

  //* Instance lekérése
  public static get instance() {
    if (!Game._instance) Game._instance = new Game();
    return Game._instance;
  }

  //* Konstruktor
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

    this.localClick = this.checkClick.bind(this);

    this.score = 0;
    this.time = 60;
    this.bonusCounter = 0;
  }

  //* Játék indítása
  public start() {
    this.addRow(3);
    GAME_CANVAS.addEventListener("click", this.localClick);
    this.animate();
    this.startTimer();
  }

  //* Játék újraindítása
  public reset() {
    GAME_CANVAS.removeEventListener("click", this.localClick);
    Game._instance = new Game();
    return Game.instance;
  }

  //* Vége a játéknak
  public gameOver(message: string) {
    clearInterval(this.timer);
    this.clickable = false;
    GAME_CANVAS.removeEventListener("click", this.localClick);
    GAME_OVER_MESSAGE.textContent = message;
    GAME_OVER_DIALOG.showModal();
  }

  //* Kilépés
  public exit() {
    clearInterval(this.timer);
    App.instance.setPage(MAIN_MENU_PAGE);
    GAME_CANVAS.removeEventListener("click", this.localClick);
  }

  //* Háttér megrajzolása
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

  //* Kockák megrajzolása
  private drawCubes() {
    this.cubes.forEach((cube) => cube.draw(this.ctx));
  }

  //* Képkockánkénti rajzolás
  private animate() {
    this.drawBackground();
    this.drawCubes();

    requestAnimationFrame(() => this.animate());
  }

  //* Időzítő elindítása
  private startTimer() {
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) this.gameOver("Lejárt az idő!");
    }, 1000);
  }

  //* Új sor hozzáadása
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

  //* Kocka eltávolítása
  public removeCube(cube: Cube) {
    if (cube.bonus) this.time += 10;
    this.cubes = this.cubes.filter((c) => c !== cube);
  }

  //* Kttintás érzékelése
  public async checkClick(e: MouseEvent) {
    if (!this.clickable) return;

    this.clickable = false;
    const { clientX, clientY } = e;

    const x =
      Math.floor((clientX - GAME_CANVAS.offsetLeft) / this.cubeSize) *
      this.cubeSize;
    const y =
      Math.floor((clientY - GAME_CANVAS.offsetTop) / this.cubeSize) *
      this.cubeSize;

    const cube = this.cubes.find((cube) => cube.x === x && cube.y === y);
    if (!cube) {
      this.clickable = true;
      return;
    }

    const collisions = this.getCollisions(cube);
    if (collisions.length < 3) {
      this.clickable = true;
      return;
    }

    BREAK_EFFECT.play();
    collisions.forEach((collision) => this.removeCube(collision));

    this.score += collisions.length * 10;
    this.bonusCounter += collisions.length * 10;

    await this.fallCubes();

    this.addRow();
    this.clickable = true;
    if (this.cubes.find((cube) => cube.y < 0))
      this.gameOver("A négyzetek elérték a plafont!");
  }

  //* Kocka "csoport" lekérése
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

  //* Kocka szomszédjainak lekérése
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

    return [top, bottom, left, right].filter((c) => c != undefined) as Cube[];
  }

  //* Lekéri a lebegő kockákat
  private getFlyingCubes(): Cube[] {
    const result: Cube[] = [];

    for (let i = 0; i < this.columnCount; i++) {
      const columnCubes = this.cubes.filter(
        (cube) => cube.x === i * this.cubeSize
      );

      if (columnCubes.length === 0) continue;

      columnCubes.sort((a, b) => b.y - a.y);

      let bottom = columnCubes[0];

      if (bottom.y != (this.rowCount - 1) * this.cubeSize) {
        result.push(...columnCubes);
        continue;
      }

      if (columnCubes.length === 1) continue;

      for (let j = 1; j < columnCubes.length; j++) {
        const current = columnCubes[j];
        if (current.y != bottom.y - this.cubeSize) {
          result.push(...columnCubes.slice(j));
          break;
        }
        bottom = current;
      }
    }

    return result;
  }

  //* Lebegő kockák "leejtése"
  private async fallCubes(): Promise<void> {
    return new Promise(async (resolve) => {
      let cubes = [];

      do {
        cubes = this.getFlyingCubes();

        cubes.forEach((cube) => {
          cube.y += this.cubeSize;
        });

        await new Promise((resolve_) => setTimeout(resolve_, 50));
      } while (cubes.length != 0);

      resolve();
    });
  }
}

export default Game;
