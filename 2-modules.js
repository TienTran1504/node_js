//CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./3-names')// import
const sayHi = require('./4-ultis')
const data = require('./5-alternative-flavor')
require('./7-mind-grenade')
console.log(data);
console.log(data.items);
console.log(data.items[0]);
console.log(data.singlePerson['name']);
sayHi("tien");
sayHi(names.john);
sayHi(names.mary); // names.mary === undefined because not be exported
sayHi(names.tony);