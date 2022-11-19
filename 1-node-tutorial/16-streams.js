const { readFileSync, createReadStream, createWriteStream } = require('fs')

const stream = createReadStream('./content/big.txt', { highWaterMark: 90000, encoding: 'utf8' }) //('./content/big.txt',utf8)
const temp = readFileSync('./content/big.txt', 'utf8');
const writeStream = createWriteStream('./content/big2.txt');
// default 64kb
// last buffer - remainder
//highWater - control size
//const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
//const stream = createReadStream('./content/big.txt', { encoding: 'utf8' })
//

stream.on('data', (result) => {
    console.log("stream: ", result);
    writeStream.write(result);
})
// shorthand version for write file : stream.pipe(writeStream);
stream.on('error', (error) => {
    console.log(error);
})
console.log("None: ", temp);

// gzip = zlib.createGunzip();
//zlib.createGzip : tạo file zip => đặt tên ghi file là vd: example.txt.gz cú pháp readStream.pipe(gzip).pipe(writeStream)
