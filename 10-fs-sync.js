const { readFileSync, writeFileSync } = require('fs');
// different way :const fs = require('fs');

const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');
const third = first + second;
console.log(first, second);
// nếu thêm object flag:'a' thì nó sẽ append nếu gọi thì nó sẽ nối chuỗi 
writeFileSync('./content/result-sync.txt',
    `Here is the result: ${third}`,
    { flag: 'a' }
)
