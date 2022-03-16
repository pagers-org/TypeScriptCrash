export class Debounce {
  static throttle(delay, noTrailing, callback, debounceMode) {
    let timeoutID;
    let cancelled = false;
    let lastExec = 0;

    function clearExistingTimeout() {
      if (timeoutID === undefined) return;

      clearTimeout(timeoutID);
    }

    function cancel() {
      clearExistingTimeout();
      cancelled = true;
    }

    if (typeof noTrailing !== 'boolean') {
      debounceMode = callback;
      callback = noTrailing;
      noTrailing = undefined;
    }

    function wrapper(...args) {
      const elapsed = Date.now() - lastExec;

      if (cancelled) return;

      function exec() {
        lastExec = Date.now();
        callback.apply(this, args);
      }

      function clear() {
        timeoutID = undefined;
      }

      if (debounceMode && !timeoutID) exec();

      clearExistingTimeout();

      if (debounceMode === undefined && elapsed > delay) {
        exec();
      } else if (noTrailing !== true) {
        timeoutID = setTimeout(
          debounceMode ? clear : exec,
          debounceMode === undefined ? delay - elapsed : delay,
        );
      }
    }

    wrapper.cancel = cancel;

    return wrapper;
  }

  static debounce(callback, delay) {
    return this.throttle(delay, callback, false);
  }
}
