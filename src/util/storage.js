export default {
  get(k, defaultValue) {
    try {
      const value = JSON.parse(localStorage.getItem(k));
      return value !== null
        ? value
        : defaultValue !== undefined
        ? defaultValue
        : null;
    } catch (e) {
      return defaultValue !== undefined ? defaultValue : null;
    }
  },
  set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  },
};
