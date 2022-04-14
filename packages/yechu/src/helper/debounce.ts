type FuncType = () => void;

function throttle(
  delay: number,
  noTrailing: FuncType | undefined,
  callback: FuncType | boolean | undefined,
  debounceMode: FuncType | boolean | undefined,
) {
  let timeoutID: ReturnType<typeof setTimeout> | undefined;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function wrapper(this: any, ...args: []) {
    //eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const elapsed = Date.now() - lastExec;

    if (cancelled) return;

    function exec() {
      lastExec = Date.now();
      if (!callback) return;
      callback = callback as FuncType;
      callback.apply(self, args);
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

export const debounce = (
  callback: FuncType,
  delay: number,
  debounceMode?: undefined,
) => throttle(delay, callback, false, debounceMode);
