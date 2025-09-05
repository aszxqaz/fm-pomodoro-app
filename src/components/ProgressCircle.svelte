<script lang="ts">
  type Props = {
    value: number;
  };

  const { value }: Props = $props();

  const radius = 48;
  const circ = Math.ceil(2 * Math.PI * radius);
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle
    style:stroke-dasharray={`${value == 0 ? circ : circ * value} ${value == 0 ? 0 : circ * (1 - value)}`}
    cx="50"
    cy="50"
    fill="none"
    r={radius}
    stroke-width="3"
    stroke-linecap="round"
    stroke-dashoffset="75"
  />
</svg>

<style>
  svg {
    stroke: var(--color-primary, var(--color-red-400));
  }
</style>
