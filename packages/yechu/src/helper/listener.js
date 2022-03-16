export function customEventListener(selector, event, callback) {
  selector.addEventListener(event, e => {
    callback(e);
  });
}
