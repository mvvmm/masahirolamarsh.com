/**
 * Checks whether the current runtime is a browser
 * @returns {boolean}
 */
 function isBrowser() {
  return typeof window !== "undefined";
}

export { isBrowser };