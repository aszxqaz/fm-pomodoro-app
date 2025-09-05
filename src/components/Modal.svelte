<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import type { RestProps } from "../lib/types";

  type Props = {
    opened: boolean;
    title: string;
    button: string;
    onAccept?: () => void;
  } & RestProps;

  let {
    opened = $bindable(),
    button,
    title,
    onAccept,
    children,
    component,
  }: Props = $props();

  function onClick() {
    onAccept?.();
    opened = false;
  }
</script>

{#if opened}
  <div transition:fade={{ duration: 100 }} class="modal" role="dialog">
    <div class="modal__window">
      <div class="modal__header">
        <h2 class="modal__title">{title}</h2>
        <button class="modal__close" onclick={() => (opened = false)}>
          <span class="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
            />
          </svg>
        </button>
      </div>
      <div class="modal__content">
        {@render children()}
      </div>
      <button class="modal__button" onclick={onClick}>{button}</button>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    z-index: 1000;
    inset: 0;
    background-color: rgb(from var(--color-blue-950) r g b / 0.9);

    display: grid;
    place-items: center;

    padding-inline: clamp(1.5rem, -3.75rem + 22.4vw, 7rem);

    user-select: none;
  }

  .modal__window {
    position: relative;

    background-color: var(--color-white);
    color: var(--color-blue-900);
    border-radius: 1rem;
    width: 100%;
    max-width: 540px;

    @media (min-width: 48em) {
      border-radius: 1.5rem;
    }
  }

  .modal__header {
    padding: 2rem 2.25rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-grey-200);
    padding-inline: clamp(1.5rem, 0.78rem + 3.05vw, 2.25rem);
  }

  .modal__title {
    font-size: 28px;
    font-weight: var(--fw-bold);
  }

  .modal__close {
    color: #979797;
  }

  .modal__content {
    padding-inline: clamp(1.5rem, 0.78rem + 3.05vw, 2.25rem);
  }

  .modal__button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);

    background-color: var(--color-red-400);
    color: var(--color-white);
    font-weight: var(--fw-bold);
    font-size: 1rem;
    line-height: 1.25;
    padding: 1.03125em 2.875em;
    border-radius: 1.65625em;
  }
</style>
