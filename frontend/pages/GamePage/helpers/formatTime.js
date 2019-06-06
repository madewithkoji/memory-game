export default function formatTime(time) {
  const hours = parseInt(time / 60 / 60, 10);
  const minutes = parseInt(time / 60 % 60, 10);
  const seconds = parseInt(time % 60, 10);

  const components = [];
  if (hours > 0) {
    components.push(hours);
  }

  if (minutes > 0) {
      components.push(minutes);
  } else {
    components.push('0');
  }

  if (seconds < 10) {
      components.push(`0${seconds}`);
  } else {
    components.push(seconds);
  }

  return components.join(':');
}