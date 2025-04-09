import App from "./modules/app.module.js";
import Game from "./modules/game.module.js";
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
  BACKGROUND_VOLUME_SLIDER,
  BACKGROUND_MUSIC,
  EFFECTS_VOLUME_SLIDER,
  BREAK_EFFECT,
  INFORMATIONS_BTN,
  INFORMATIONS_PAGE,
  GAME_OVER_DIALOG,
  GAME_OVER_BTN,
  GAME_OVER_INPUT,
  SCOREBOARD_LIST,
} from "./modules/items.module.js";
import Sound from "./modules/sound.module.js";

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

if (WINDOW_WIDTH > WINDOW_HEIGHT) CONTAINER.style.height = `100%`;
else CONTAINER.style.width = `100%`;

//*------------------------------------------------------------------------------------------------------------------
//* MAIN
//*------------------------------------------------------------------------------------------------------------------

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

// Input gombok beállítása

START_BTN.addEventListener("click", () => {
  App.instance.setPage(GAME_PAGE);
  Game.instance.reset().start();
});
INFORMATIONS_BTN.addEventListener("click", () =>
  App.instance.setPage(INFORMATIONS_PAGE)
);
SETTINGS_BTN.addEventListener("click", () =>
  App.instance.setPage(SETTINGS_PAGE)
);
SCOREBOARD_BTN.addEventListener("click", () => {
  console.log(App.instance.records);

  let listItems = App.instance.records
    .map(
      (record, index) =>
        `<tr>
          <td>${index + 1}.</td>
          <td>${record.name}</td>
          <td>${record.score}</td>
          <td>${new Date(record.date).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  for (let i = App.instance.records.length; i < 10; i++) {
    listItems += `<tr>
          <td>${i + 1}.</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>`;
  }

  SCOREBOARD_LIST.innerHTML = `
    <table class="scoreboard-list">
      <thead>
        <tr>
          <th>Helyezés</th>
          <th>Név</th>
          <th>Eredmény</th>
          <th>Dátum</th>
        </tr>
      </thead>
      <tbody>
        ${listItems}
      </tbody>
    </table>
    `;

  App.instance.setPage(SCOREBOARD_PAGE);
});

// Hangerők állítása

BACKGROUND_VOLUME_SLIDER.value = Sound.backgroundVolume.toString();
BACKGROUND_VOLUME_SLIDER.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = Number(target.value);

  Sound.backgroundVolume = value;
});

EFFECTS_VOLUME_SLIDER.value = Sound.effectVolume.toString();
EFFECTS_VOLUME_SLIDER.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = Number(target.value);

  Sound.effectVolume = value;
  BREAK_EFFECT.play();
});

// Vissza gombok

Array.from(BACK_BTNS).forEach((btn) => {
  btn.addEventListener("click", () => App.instance.setPage(MAIN_MENU_PAGE));
});

GAME_OVER_DIALOG.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
  }
});

GAME_OVER_BTN.addEventListener("click", () => {
  const name = GAME_OVER_INPUT.value || "Anonim";

  const record = { name, score: Game.instance.score, date: new Date() };

  App.instance.addRecord(record);

  GAME_OVER_DIALOG.close();
  Game.instance.exit();
});
