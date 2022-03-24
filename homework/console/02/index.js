import calculate from './calculate.js';
import Control from './control.js';

const control = new Control('game', 'start');

console.log(control.render());

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
