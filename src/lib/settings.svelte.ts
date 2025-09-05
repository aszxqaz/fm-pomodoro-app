import { app } from "./app.svelte";
import { Mode } from "./types";

type AppFont = {
  family: string;
  weight: string;
  displayWeight: string;
  buttonWeight: string;
};

export const fontSans: AppFont = {
  family: "var(--ff-sans)",
  weight: "var(--fw-bold)",
  displayWeight: "var(--fw-bold)",
  buttonWeight: "var(--fw-bold)",
};

export const fontSerif: AppFont = {
  family: "var(--ff-serif)",
  weight: "var(--fw-regular)",
  displayWeight: "var(--fw-bold)",
  buttonWeight: "var(--fw-bold)",
};

export const fontMono: AppFont = {
  family: "var(--ff-mono)",
  weight: "var(--fw-bold)",
  displayWeight: "var(--fw-regular)",
  buttonWeight: "var(--fw-bold)",
};

export const AppFonts = [fontSans, fontSerif, fontMono];

export const AppColors = [
  "var(--color-primary-red)",
  "var(--color-primary-cyan)",
  "var(--color-primary-purple)",
] as const;

export type AppColor = (typeof AppColors)[number];

export class Settings {
  state = $state({
    duration: new Duration(),
    fontIndex: 0,
    color: "var(--color-primary-red)" as AppColor,
  });
}

export class Duration {
  #pomodoro = $state(25);
  #shortBreak = $state(5);
  #longBreak = $state(15);

  get pomodoro() {
    return this.#pomodoro;
  }

  get shortBreak() {
    return this.#shortBreak;
  }

  get longBreak() {
    return this.#longBreak;
  }

  set pomodoro(value: number) {
    if (value <= this.#longBreak) return;
    this.#pomodoro = value;
  }

  set shortBreak(value: number) {
    if (value <= 0 || value >= this.#longBreak) return;
    this.#shortBreak = value;
  }

  set longBreak(value: number) {
    if (value >= this.#pomodoro || value <= this.#shortBreak) return;
    this.#longBreak = value;
  }
}
