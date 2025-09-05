<script>
  import { app } from "../lib/app.svelte";
  import { modal } from "../lib/modal.svelte";
  import {
    AppFonts,
    Duration,
    fontMono,
    fontSans,
    fontSerif,
  } from "../lib/settings.svelte";
  import { Mode } from "../lib/types";
  import ColorRadioGroup from "./ColorRadioGroup.svelte";
  import FontRadioGroup from "./FontRadioGroup.svelte";
  import Modal from "./Modal.svelte";
  import NumberInput from "./NumberInput.svelte";

  let fontIndex = $state(app.settings.state.fontIndex);
  let color = $state(app.settings.state.color);
  const duration = new Duration();
  duration.pomodoro = app.settings.state.duration.pomodoro;
  duration.shortBreak = app.settings.state.duration.shortBreak;
  duration.longBreak = app.settings.state.duration.longBreak;

  function applySettings() {
    app.settings.state.duration = duration;
    app.settings.state.color = color;
    app.settings.state.fontIndex = fontIndex;
  }
</script>

<Modal
  title="Settings"
  button="Apply"
  bind:opened={modal.settings}
  onAccept={applySettings}
>
  <div class="settings">
    <div class="settings__time section time">
      <h3 class="time__title title">Time (minutes)</h3>
      <div class="time__input-group">
        <label class="time__label">
          Pomodoro
          <NumberInput bind:value={duration.pomodoro} />
        </label>
        <label class="time__label">
          Short Break
          <NumberInput bind:value={duration.shortBreak} />
        </label>
        <label class="time__label">
          Long Break
          <NumberInput bind:value={duration.longBreak} />
        </label>
      </div>
    </div>

    <div class="settings__font section group-radio">
      <h3 class="title">Font</h3>
      <FontRadioGroup
        bind:value={fontIndex}
        options={[
          {
            family: "var(--ff-sans)",
            weight: "var(--fw-bold)",
            label: "Sans",
            value: 0,
          },
          {
            family: "var(--ff-serif)",
            weight: "400",
            label: "Serif",
            value: 1,
          },
          {
            family: "var(--ff-mono)",
            weight: "var(--fw-bold)",
            label: "Mono",
            value: 2,
          },
        ]}
      />
    </div>

    <div class="settings__color section group-radio">
      <h3 class="title">Color</h3>
      <ColorRadioGroup
        bind:value={color}
        options={[
          {
            label: "Red",
            value: "var(--color-primary-red)",
            color: "var(--color-primary-red)",
          },
          {
            label: "Cyan",
            value: "var(--color-primary-cyan)",
            color: "var(--color-primary-cyan)",
          },
          {
            label: "Purple",
            value: "var(--color-primary-purple)",
            color: "var(--color-primary-purple)",
          },
        ]}
      />
    </div>
  </div>
</Modal>

<style>
  .settings {
    padding-block: 1rem 5.125rem;

    @media (min-width: 48em) {
      padding-block: 2rem 4.625rem;
    }
  }

  .section {
    display: grid;
    row-gap: 1rem;
    justify-items: center;

    &:not(:last-of-type) {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgb(from var(--color-blue-900) r g b / 0.1);
    }

    &:not(:first-of-type) {
      padding-top: 1.5rem;
    }
  }

  .group-radio {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 48em) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .title {
    font-size: 11px;
    font-weight: var(--fw-bold);
    letter-spacing: 0.3846153846153846em;
    color: var(--color-blue-900);
    text-transform: uppercase;

    @media (min-width: 48em) {
      font-size: 13px;
    }
  }

  .time__input-group {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    @media (min-width: 48em) {
      flex-direction: row;
      column-gap: 1.5rem;
    }
  }

  .time__label {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    font-size: 12px;
    font-weight: var(--fw-bold);
    line-height: 1.25;
    color: rgb(from var(--color-blue-850) r g b / 0.4);
    text-transform: lowercase;

    @media (min-width: 48em) {
      grid-template-columns: 1fr;
      row-gap: 0.5rem;
    }
  }

  .settings__time {
    @media (min-width: 48em) {
      justify-items: flex-start;
    }
  }
</style>
