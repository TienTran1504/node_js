const { readFile, writeFile } = require('fs');
// add callback function
console.log("Start");
readFile('./content/first.txt', 'utf-8', (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    const first = result;
    console.log(first);
    readFile('./content/second.txt', 'utf-8', (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        const second = result;
        console.log(second);
        writeFile('./content/result.txt', `Here is the result: ${first} ${second}`, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result); // undefined but still write in result.txt
            console.log("done")
        })
    })
})
console.log("Starting the next one");