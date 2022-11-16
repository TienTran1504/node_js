const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('response', (name, id) => {
    console.log(`data recieved 1: ${name} ${id}`);

})
customEmitter.emit('response');

customEmitter.on('response', () => {
    console.log(`data recieved 2`);

})


customEmitter.on('click', () => {
    console.log(`some other logic here`);

})

customEmitter.emit('click');
customEmitter.emit('response', 'john', 34);