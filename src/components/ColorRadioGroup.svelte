<script lang="ts" generics="T">
  import type { RestProps } from "../lib/types";

  type Props<T> = {
    options: { label: string; value: T; color: string }[];
    value: T;
  } & RestProps;

  let { value = $bindable(), options, ...rest }: Props<T> = $props();

  $inspect(value);

  const name = $props.id();
</script>

<fieldset>
  <legend class="sr-only">Choose color</legend>
  {#each options as option}
    <label
      style:background-color={option.color}
      class:checked={option.value == value}
    >
      <input
        type="radio"
        {name}
        id={option.label}
        value={option.value}
        bind:group={value}
        checked={option.value == value}
      />
      <span class="sr-only">{option.label}</span>
    </label>
  {/each}
</fieldset>

<style>
  fieldset {
    display: flex;
    gap: 1rem;
  }

  label {
    flex-shrink: 0;

    display: inline-block;

    width: 40px;
    height: 40px;

    position: relative;

    font-size: 1rem;
    color: var(--color-blue-850);

    background-color: var(--color-blue-50);

    border-radius: 50%;

    cursor: pointer;

    transition:
      background-color 0.3s,
      outline-color 0.3s;

    &.checked {
      background-image: url("/icons/icon-check.svg");
      background-position: center;
      background-size: 16px 11px;
      background-repeat: no-repeat;
    }

    @media (hover: hover) {
      outline-offset: 4px;
      outline: 1px solid transparent;

      &:not(.checked):hover {
        outline-color: var(--color-blue-50);
      }
    }
  }

  input {
    appearance: none;
  }
</style>
