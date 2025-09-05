<script lang="ts">
  import type { RestProps } from "../lib/types";

  const { className, ...rest }: RestProps = $props();
</script>

<h1 class={["logo", className]} {...rest}>Pomodoro</h1>

<style>
  .logo {
    display: inline-block;
    font-family: var(--ff-sans);
    font-size: clamp(1.5rem, 1rem + 2.0356vw, 2rem);
    font-weight: var(--fw-bold);
    color: var(--logo-color);
    line-height: 1;
    text-transform: lowercase;
  }
</style>
