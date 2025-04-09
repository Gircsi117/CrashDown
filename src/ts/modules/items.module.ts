export const CONTAINER = document.querySelector("#container") as HTMLDivElement;
export const MAIN_MENU_PAGE = document.querySelector(
  "#main-menu"
) as HTMLDivElement;
export const SETTINGS_PAGE = document.querySelector(
  "#settings"
) as HTMLDivElement;
export const INFORMATIONS_PAGE = document.querySelector(
  "#informations"
) as HTMLDivElement;
export const SCOREBOARD_PAGE = document.querySelector(
  "#scoreboard"
) as HTMLDivElement;
export const GAME_PAGE = document.querySelector("#game") as HTMLDivElement;

export const SCOREBOARD_LIST = document.querySelector(
  "#scoreboard-list"
) as HTMLDivElement;

// Gombok
export const START_BTN = document.querySelector(
  "#start-btn"
) as HTMLButtonElement;
export const INFORMATIONS_BTN = document.querySelector(
  "#informations-btn"
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

export const SCORE = document.querySelector("#score") as HTMLSpanElement;
export const TIME = document.querySelector("#time") as HTMLSpanElement;

export const GAME_OVER_DIALOG = document.querySelector(
  "#game-over-dialog"
) as HTMLDialogElement;

export const GAME_OVER_MESSAGE = document.querySelector(
  "#game-over-message"
) as HTMLSpanElement;

export const GAME_OVER_INPUT = document.querySelector(
  "#game-over-input"
) as HTMLInputElement;

export const GAME_OVER_BTN = document.querySelector(
  "#game-over-btn"
) as HTMLButtonElement;

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
