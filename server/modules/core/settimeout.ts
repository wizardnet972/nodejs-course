function setTimeoutInExpress(fn, ms, next) {
  if (!next) throw new Error('you must implement next function');

  setTimeout(() => {
    try {
      fn();
    } catch (e) {
      next(e);
    }
  }, ms);
}

export { setTimeoutInExpress as setTimeout };
