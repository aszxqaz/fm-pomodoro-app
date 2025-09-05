export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  const format = (n: number) => n.toString().padStart(2, "0");

  return `${format(minutes)}:${format(seconds)}`;
}
