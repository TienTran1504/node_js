const _ = require('lodash');

const item = [1, [2, [3, [4]]]]
const new_items = _.flattenDeep(item);
console.log(new_items);
console.log("Hello");