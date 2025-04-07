import App from "./modules/app.module.js";
import {
  BACK_BTNS,
  CONTAINER,
  GAME_PAGE,
  MAIN_MENU_PAGE,
  SCOREBOARD_BTN,
  SCOREBOARD_PAGE,
  SETTINGS_BTN,
  SETTINGS_PAGE,
  START_BTN,
  VOLUME_SLIDER,
  BACKGROUND_MUSIC,
} from "./modules/items.module.js";

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

if (WINDOW_WIDTH > WINDOW_HEIGHT) CONTAINER.style.height = `100%`;
else CONTAINER.style.width = `100%`;

//*------------------------------------------------------------------------------------------------------------------
//* MAIN
//*------------------------------------------------------------------------------------------------------------------
const app = new App();

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

START_BTN.addEventListener("click", () => app.setPage(GAME_PAGE));
SETTINGS_BTN.addEventListener("click", () => app.setPage(SETTINGS_PAGE));
SCOREBOARD_BTN.addEventListener("click", () => app.setPage(SCOREBOARD_PAGE));

VOLUME_SLIDER.value = app.volume.toString();
VOLUME_SLIDER.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = Number(target.value);

  app.volume = value;
});

Array.from(BACK_BTNS).forEach((btn) => {
  btn.addEventListener("click", () => app.setPage(MAIN_MENU_PAGE));
});
