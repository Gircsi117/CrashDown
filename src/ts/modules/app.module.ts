import {
  BACKGROUND_MUSIC,
  GAME_PAGE,
  MAIN_MENU_PAGE,
  SCOREBOARD_PAGE,
  SETTINGS_PAGE,
} from "./items.module.js";

class App {
  private readonly pages = [
    MAIN_MENU_PAGE,
    SETTINGS_PAGE,
    SCOREBOARD_PAGE,
    GAME_PAGE,
  ];

  constructor() {
    this.setPage(MAIN_MENU_PAGE);
    App.volume = Number(sessionStorage.getItem("volume") || 0.1);
  }

  public setPage(page: HTMLElement) {
    this.pages.forEach((p) => {
      p.style.display = "none";
    });
    page.style.display = "flex";
  }

  public static get volume(): number {
    return BACKGROUND_MUSIC.volume;
  }

  public static set volume(value: number) {
    BACKGROUND_MUSIC.volume = value;
    sessionStorage.setItem("volume", value.toString());
  }
}

export default App;
