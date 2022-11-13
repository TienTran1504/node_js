
console.log("Hello world")

// Globals - No window 
// __dirname - path to current history
// __filename - file name
// require - function to use modules (commonJS)
// module - info about current module (file)
// process - info about env where the program is being executed
console.log(__dirname); ///Users/trandungtien/Desktop/Project/NodeJS
console.log(__filename); ///Users/trandungtien/Desktop/Project/NodeJS/app.js
console.log(require);
console.log(module);
console.log(process);
setTimeout(() => {
    console.log("hello");
}, 1000)


