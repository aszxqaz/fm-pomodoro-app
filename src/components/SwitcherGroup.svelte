<script lang="ts" generics="T">
  import type { RestProps } from "../lib/types";

  type Props<T> = {
    options: { label: string; value: T }[];
    value: T;
  } & RestProps;

  let { value = $bindable(), options, clazz, ...rest }: Props<T> = $props();

  const name = $props.id();
</script>

<fieldset class={["switcher", clazz]} {...rest}>
  <legend class="sr-only">Choose mode</legend>
  {#each options as option}
    <label class="switcher__label" class:selected={value == option.value}
      ><input
        class="switcher__input"
        type="radio"
        {name}
        id={option.label}
        value={option.value}
        bind:group={value}
      />{option.label}</label
    >
  {/each}
</fieldset>

<style>
  .switcher {
    display: inline-flex;

    font-size: 0.875rem;
    padding: 0.5357142857142857em 0.7142857142857143em;
    border-radius: 2.25em;
    background-color: var(--color-blue-900);
  }

  .switcher__label {
    width: 7.5em;

    height: 3.428571428571429em;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    text-transform: lowercase;
    font-weight: var(--fw-bold);
    color: var(--color-blue-100);
    border-radius: 1.892857142857143em;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:focus-within {
      outline: solid 2px var(--color-primary);
      outline-offset: 4px;
    }

    &.selected {
      background-color: var(--color-primary);
      color: var(--color-blue-850);
    }

    @media (min-width: 48em) {
      width: 8.571428571428571em;
    }
  }

  .switcher__input {
    appearance: none;
  }
</style>
