type AnyFunction = (args: any) => any;

function throttle(
  delay: number,
  noTrailing: AnyFunction | undefined | boolean,
  callback: AnyFunction | undefined,
  debounceMode: AnyFunction | undefined,
) {
  let timeoutID: number | undefined | ReturnType<typeof setTimeout>;
  let cancelled = false;
  let lastExec = 0;

  function clearExistingTimeout() {
    if (timeoutID === undefined) return;
    clearTimeout(timeoutID as number);
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

  function wrapper(...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // TODO: function to class
    const self = this;
    const elapsed = Date.now() - lastExec;

    if (cancelled) return;

    function exec() {
      lastExec = Date.now();
      callback!.apply(self, args);
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

export const debounce = (callback: AnyFunction, delay: number) =>
  throttle(delay, callback, undefined, undefined);
