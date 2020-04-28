export function msToString(ms) {
    if (!ms) return '0';
    if (ms < 1000) return `${ms} ms`;
    if (ms < 1000 * 60) return `${Math.floor(ms / 1000)}.${ms % 1000} s`; 
    const addZero = (value) => (value < 10 ? `0${value}` : value);
    const hours = addZero(Math.floor(ms / (1000 * 60 * 60)));
    const minutes = addZero(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = addZero(Math.floor((ms / 1000) % 60));
    ms = ms % 1000;
    return `${hours}:${minutes}:${seconds}.${ms}`;
  }