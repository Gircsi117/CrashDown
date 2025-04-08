export const CONTAINER = document.querySelector("#container") as HTMLDivElement;
export const MAIN_MENU_PAGE = document.querySelector(
  "#main-menu"
) as HTMLDivElement;
export const SETTINGS_PAGE = document.querySelector(
  "#settings"
) as HTMLDivElement;
export const SCOREBOARD_PAGE = document.querySelector(
  "#scoreboard"
) as HTMLDivElement;
export const GAME_PAGE = document.querySelector("#game") as HTMLDivElement;

// Gombok
export const START_BTN = document.querySelector(
  "#start-btn"
) as HTMLButtonElement;
export const SETTINGS_BTN = document.querySelector(
  "#settings-btn"
) as HTMLButtonElement;
export const SCOREBOARD_BTN = document.querySelector(
  "#scoreboard-btn"
) as HTMLButtonElement;

export const BACK_BTNS = document.getElementsByClassName("back-btn");

// Játék
export const GAME_FIELD = document.querySelector(
  "#game-field"
) as HTMLDivElement;

export const GAME_CANVAS = document.querySelector(
  "#game-canvas"
) as HTMLCanvasElement;

// Beállítások
export const BACKGROUND_VOLUME_SLIDER = document.querySelector(
  "#backgound-volume-input"
) as HTMLInputElement;

export const EFFECTS_VOLUME_SLIDER = document.querySelector(
  "#effects-volume-input"
) as HTMLInputElement;

// Zene
export const BACKGROUND_MUSIC = document.querySelector(
  "#background-music"
) as HTMLAudioElement;

export const BREAK_EFFECT = document.querySelector(
  "#break-effect"
) as HTMLAudioElement;
