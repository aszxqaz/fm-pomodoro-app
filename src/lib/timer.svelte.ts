import { formatDuration } from "./utils";

type TimerStatus = "idle" | "running" | "paused" | "completed";

export class Timer {
  seconds = $state(0);
  total = $state(1);
  timeout!: number;
  lastTs!: number;
  status: TimerStatus = $state("idle");
  pausedTs!: number;

  constructor(minutes: number) {
    this.seconds = minutes * 60;
    this.total = this.seconds;
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.restart = this.restart.bind(this);
  }

  tick() {
    clearTimeout(this.timeout);

    const currentTs = Date.now();
    this.seconds = this.seconds - 1;
    if (this.seconds == 0) {
      this.status = "completed";
      return;
    }

    const nextTick = 2000 - currentTs + this.lastTs;
    this.lastTs = currentTs;
    this.timeout = setTimeout(this.tick, nextTick);
  }

  pause() {
    if (this.status != "running") {
      throw new Error("bad state");
    }
    this.pausedTs = Date.now();
    this.status = "paused";
    clearTimeout(this.timeout);
  }

  resume() {
    if (this.status != "paused") {
      throw new Error("bad state");
    }
    this.status = "running";
    const nextTick = 1000 + this.lastTs - this.pausedTs;
    this.lastTs = Date.now() + nextTick - 1000;
    this.timeout = setTimeout(this.tick, nextTick);
  }

  start() {
    if (this.status != "idle") {
      throw new Error("bad state");
    }
    this.status = "running";
    this.lastTs = Date.now();
    this.timeout = setTimeout(this.tick, 1000);
  }

  restart() {
    if (this.status != "completed") {
      console.log(this.status);
      throw new Error("bad state");
    }
    this.status = "running";
    this.seconds = this.total;
    this.lastTs = Date.now();
    this.timeout = setTimeout(this.tick, 1000);
  }
}
