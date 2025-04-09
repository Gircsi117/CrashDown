import {
  BACKGROUND_MUSIC,
  GAME_PAGE,
  INFORMATIONS_PAGE,
  MAIN_MENU_PAGE,
  SCOREBOARD_PAGE,
  SETTINGS_PAGE,
} from "./items.module.js";

class App {
  private readonly pages = [
    MAIN_MENU_PAGE,
    INFORMATIONS_PAGE,
    SETTINGS_PAGE,
    SCOREBOARD_PAGE,
    GAME_PAGE,
  ];

  private static _instance: App;

  public static get instance() {
    if (!App._instance) App._instance = new App();
    return App._instance;
  }

  private constructor() {
    this.setPage(MAIN_MENU_PAGE);
  }

  public setPage(page: HTMLElement) {
    this.pages.forEach((p) => {
      p.style.display = "none";
    });
    page.style.display = "flex";
  }
}

export default App;
