interface ThrottleInterface {
  delay: number;
  noTrailing?: boolean | (() => void);
  callback?: () => void;
  debounceMode?: boolean | (() => void);
}

function throttle({
  delay,
  noTrailing,
  callback,
  debounceMode,
}: ThrottleInterface) {
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

  function wrapper(this: void, ...args: []) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const elapsed = Date.now() - lastExec;

    if (cancelled) return;

    function exec() {
      lastExec = Date.now();
      callback?.apply(self, args);
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

const debounce = (callback: () => void, delay: number) =>
  throttle({ delay, noTrailing: false, callback, debounceMode: false });

export { debounce };
