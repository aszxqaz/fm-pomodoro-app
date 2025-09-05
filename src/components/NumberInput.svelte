<script lang="ts">
  type Props = {
    value: number;
  };

  let { value = $bindable() } = $props();
</script>

<div class="wrapper">
  <input class="input" type="number" bind:value />
  <div class="arrow-group">
    <button class="arrow-button" onclick={() => value++}>
      <span class="sr-only">Plus one minute</span>
      <svg class="arrow-icon">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </button>
    <button class="arrow-button" onclick={() => value--}>
      <span class="sr-only">Minus one minute</span>
      <svg class="arrow-icon arrow-icon--down">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </button>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 7"
      id="icon-arrow"
    >
      <path fill="none" stroke-width="2" d="M1 6l6-4 6 4"></path>
    </symbol>
  </svg>
</div>

<style>
  .wrapper {
    display: inline-flex;
    height: 40px;

    font-size: 0.8125rem;
    font-weight: var(--fw-bold);
    letter-spacing: 0.3846153846153846em;
    line-height: 1.25;

    border-radius: 0.625rem;
    background-color: var(--color-blue-50);
    color: var(--color-blue-850);

    padding-inline: 1rem;

    &:focus-within {
      outline: 1px solid var(--color-blue-50);
      outline-offset: 2px;
    }

    @media (min-width: 48em) {
      height: 48px;
    }
  }

  .input {
    flex: 1;
    min-width: 0;
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    appearance: none;
    -moz-appearance: textfield;

    background: none;
    border: none;
    font: inherit;
    padding: 0;
    outline: none;
  }

  .arrow-group {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }

  .arrow-button {
    padding: 4px;

    @media (hover: hover) {
      .arrow-icon {
        transition: stroke 0.3s;
      }

      &:not(:disabled):hover {
        .arrow-icon {
          stroke: var(--color-blue-850);
        }
      }
    }
  }

  .arrow-icon {
    stroke: var(--color-grey-400);
    width: 14px;
    height: 6px;
  }

  .arrow-icon--down {
    transform: rotate(180deg);
  }
</style>
