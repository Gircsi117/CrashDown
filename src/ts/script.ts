//*------------------------------------------------------------------------------------------------------------------
//* Html elemek
//*------------------------------------------------------------------------------------------------------------------
const CONTAINER = document.querySelector("#container") as HTMLDivElement;
const MAIN_MENU = document.querySelector("#main-menu") as HTMLDivElement;
const SETTINGS = document.querySelector("#settings") as HTMLDivElement;
const SCOREBOARD = document.querySelector("#scoreboard") as HTMLDivElement;
const GAME = document.querySelector("#game") as HTMLDivElement;

// Gombok
const START_BTN = document.querySelector("#start-btn") as HTMLButtonElement;
const SETTINGS_BTN = document.querySelector(
  "#settings-btn"
) as HTMLButtonElement;
const SCOREBOARD_BTN = document.querySelector(
  "#scoreboard-btn"
) as HTMLButtonElement;

const BACK_BTNS = document.getElementsByClassName("back-btn");

// Settings
const VOLUME_SLIDER = document.querySelector(
  "#volume-input"
) as HTMLInputElement;

//*------------------------------------------------------------------------------------------------------------------
//* Média elemek
//*------------------------------------------------------------------------------------------------------------------
const BACKGROUND_MUSIC = document.querySelector(
  "#background-music"
) as HTMLAudioElement;

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

if (WINDOW_WIDTH > WINDOW_HEIGHT) CONTAINER.style.height = `100%`;
else CONTAINER.style.width = `100%`;

//*------------------------------------------------------------------------------------------------------------------
//* Game
//*------------------------------------------------------------------------------------------------------------------
class Game {
  private readonly pages = [MAIN_MENU, SETTINGS, SCOREBOARD, GAME];

  constructor() {
    this.setPage(MAIN_MENU);
    this.volume = Number(sessionStorage.getItem("volume") || 0.1);
  }

  public setPage(page: HTMLElement) {
    this.pages.forEach((p) => {
      p.style.display = "none";
    });
    page.style.display = "flex";
  }

  get volume(): number {
    return BACKGROUND_MUSIC.volume;
  }

  set volume(value: number) {
    BACKGROUND_MUSIC.volume = value;
    sessionStorage.setItem("volume", value.toString());
  }
}

//*------------------------------------------------------------------------------------------------------------------
//* MAIN
//*------------------------------------------------------------------------------------------------------------------
const game = new Game();

// Zene indítása
document.addEventListener(
  "click",
  () => {
    BACKGROUND_MUSIC.play().catch((err) => {
      console.log("Audio error:", err);
    });
  },
  { once: true }
);

START_BTN.addEventListener("click", () => game.setPage(GAME));
SETTINGS_BTN.addEventListener("click", () => game.setPage(SETTINGS));
SCOREBOARD_BTN.addEventListener("click", () => game.setPage(SCOREBOARD));

VOLUME_SLIDER.value = game.volume.toString();
VOLUME_SLIDER.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;

  const value = Number(target.value);

  game.volume = value;
});

Array.from(BACK_BTNS).forEach((btn) => {
  btn.addEventListener("click", () => game.setPage(MAIN_MENU));
});
