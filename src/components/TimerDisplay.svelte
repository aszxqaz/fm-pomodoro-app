<script lang="ts">
  import { app } from "../lib/app.svelte";
  import { AppFonts } from "../lib/settings.svelte";
  import type { Timer } from "../lib/timer.svelte";
  import type { RestProps } from "../lib/types";
  import { formatDuration } from "../lib/utils";
  import ProgressCircle from "./ProgressCircle.svelte";

  type Props = {
    timer: Timer;
  } & RestProps;

  const { timer, clazz }: Props = $props();

  const font = $derived(AppFonts[app.settings.state.fontIndex]);
</script>

<div style:--fw-display={font.displayWeight} class={["timer", clazz]}>
  <div class="timer__front">
    <div class="timer__inner">
      <div class="timer__content">
        <div class="timer__time">{formatDuration(timer.seconds)}</div>
        {#if timer.status == "idle"}
          <button class="timer__button" onclick={timer.start}>Start</button>
        {:else if timer.status == "running"}
          <button class="timer__button" onclick={timer.pause}>Pause</button>
        {:else if timer.status == "paused"}
          <button class="timer__button" onclick={timer.resume}>Resume</button>
        {:else if timer.status == "completed"}
          <button class="timer__button" onclick={timer.restart}>Restart</button>
        {/if}
      </div>
      <div class="timer__progress">
        <ProgressCircle value={timer.seconds / timer.total} />
      </div>
    </div>
  </div>
</div>

<style>
  .timer {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    padding: 16px;
    background-image: var(--gradient);
    border-radius: 50%;
    box-shadow:
      -3.125rem -3.125rem 6.25rem 0 rgb(39, 44, 90),
      -3.125rem -3.125rem 6.25rem 0 rgb(18, 21, 48);

    @media (min-width: 48em) {
      padding: 22px;
    }
  }

  .timer__front {
    height: 100%;
    background-color: var(--color-blue-900);
    border-radius: inherit;

    padding: 10px;

    @media (min-width: 48em) {
      padding: 13px 13px 14px 14px;
    }
  }

  .timer__inner {
    position: relative;
    width: 100%;
    height: 100%;
    isolation: isolate;

    display: grid;
    place-items: center;
  }

  .timer__progress {
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .timer__content {
    position: relative;
    color: var(--color-blue-100);
  }

  .timer__time {
    font-size: 80px;
    font-weight: var(--fw-display);
    line-height: 1.25;
    letter-spacing: -5px;

    @media (min-width: 48em) {
      font-size: 100px;
    }
  }

  .timer__button {
    position: absolute;
    top: 100%;
    left: calc(50%);
    transform: translateX(-50%);

    font-size: 14px;
    font-weight: var(--fw-bold);
    letter-spacing: 13px;
    text-transform: uppercase;
    padding-inline-start: 1em;

    @media (min-width: 48em) {
      top: calc(100% + 8px);

      font-size: 1rem;
      letter-spacing: 15px;
      line-height: 1.25;
    }
  }
</style>
