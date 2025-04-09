import { BACKGROUND_MUSIC, BREAK_EFFECT } from "./items.module.js";

class Sound {
  static get backgroundVolume(): number {
    return BACKGROUND_MUSIC.volume;
  }

  static set backgroundVolume(value: number) {
    BACKGROUND_MUSIC.volume = value;
    sessionStorage.setItem("backgound-volume", value.toString());
  }

  static get effectVolume(): number {
    return BREAK_EFFECT.volume;
  }

  static set effectVolume(value: number) {
    BREAK_EFFECT.volume = value;
    sessionStorage.setItem("effects-volume", value.toString());
  }
}

// Alap hangerő beállítása

const backgroundVolume = sessionStorage.getItem("backgound-volume");
const effectsVolume = sessionStorage.getItem("effects-volume");

Sound.backgroundVolume = Number(backgroundVolume || 0.1);
Sound.effectVolume = Number(effectsVolume || 0.1);

export default Sound;
