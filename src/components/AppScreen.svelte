<script lang="ts">
  import { app } from "../lib/app.svelte";
  import { modal } from "../lib/modal.svelte";
  import { AppFonts } from "../lib/settings.svelte";
  import { Timer } from "../lib/timer.svelte";
  import { Mode } from "../lib/types";
  import Logo from "./Logo.svelte";
  import SettingsButton from "./SettingsButton.svelte";
  import SwitcherGroup from "./SwitcherGroup.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";

  let mode = $state(Mode.pomodoro);

  $effect(() => {
    app.timer = new Timer(
      mode == Mode.pomodoro
        ? app.settings.state.duration.pomodoro
        : mode == Mode.longBreak
          ? app.settings.state.duration.longBreak
          : app.settings.state.duration.shortBreak
    );
  });

  const font = $derived(AppFonts[app.settings.state.fontIndex]);
</script>

<div
  style:--color-primary={app.settings.state.color}
  style:font-family={font.family}
  style:font-weight={font.weight}
  class="wrapper stack"
>
  <header class="header">
    <Logo />
  </header>
  <main class="main stack">
    <SwitcherGroup
      clazz="main__switcher"
      options={[
        { value: Mode.pomodoro, label: "Pomodoro" },
        { value: Mode.shortBreak, label: "Short Break" },
        { value: Mode.longBreak, label: "Long Break" },
      ]}
      bind:value={mode}
    />
    <TimerDisplay clazz="main__dispay" timer={app.timer} />
    <SettingsButton
      onclick={() => (modal.settings = true)}
      clazz="main__settings"
    />
  </main>
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrapper {
    height: 100%;
    padding-block: 2rem 3rem;

    user-select: none;

    @media (min-width: 48em) {
      padding-block: 5rem 6.5rem;
    }

    @media (min-width: 90em) {
      padding-block: 3rem 4rem;
    }
  }

  .header {
    text-align: center;
    margin-block-end: 2.5rem;

    @media (min-width: 48em) {
      margin-block-end: 3rem;
    }

    @media (min-width: 90em) {
      margin-block-end: 3.5;
    }
  }

  .main {
    height: 100%;
  }

  :global(.main__switcher) {
    z-index: 1;
    margin-block-end: 3rem;

    @media (min-width: 48em) {
      margin-block-end: 6.75rem;
    }

    @media (min-width: 90em) {
      margin-block-end: 2.25rem;
    }
  }

  :global(.main__display) {
    max-width: 25.625rem;
    margin-inline: auto;
  }

  :global(.main__settings) {
    margin-block-start: auto;
  }
</style>
