export function formatTime(value: Date | string) {
  return new Date(value).toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}
