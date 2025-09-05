import { AppFonts, Settings } from "./settings.svelte";
import { Timer } from "./timer.svelte";
import { Mode } from "./types";

export const app = $state({
  timer: new Timer(25),
  settings: new Settings(),
  mode: Mode.pomodoro,
});
