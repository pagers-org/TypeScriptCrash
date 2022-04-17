function throttle(
  delay: number,
  callback: () => void,
  noTrailing: boolean,
  debounceMode?: () => void
) {
  let timeoutID: NodeJS.Timeout | undefined;
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

  //TODO: noTrailing is boolean or typeof callback?
  // if (typeof noTrailing !== "boolean") {
  //   debounceMode = callback;
  //   callback = noTrailing;
  //   noTrailing = undefined;
  // }

  function wrapper(...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const elapsed = Date.now() - lastExec;

    if (cancelled) return;

    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }

    function clear() {
      timeoutID = undefined;
    }

    if (!timeoutID) exec();

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  wrapper.cancel = cancel;
  return wrapper;
}

export const debounce = (callback: () => void, delay: number) =>
  throttle(delay, callback, false);
