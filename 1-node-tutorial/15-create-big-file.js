const { writeFileSync } = require('fs');
for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
        writeFileSync('./content/big.txt', `hello world ${i} ${j}\n`, { flag: 'a' })
    }
}