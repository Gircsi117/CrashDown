import { BACKGROUND_MUSIC } from "./items.module.js";

class Sound {
  static get volume(): number {
    return BACKGROUND_MUSIC.volume;
  }

  static set volume(value: number) {
    BACKGROUND_MUSIC.volume = value;
    sessionStorage.setItem("volume", value.toString());
  }
}

Sound.volume = Number(sessionStorage.getItem("volume") || 0.1);
export default Sound;
