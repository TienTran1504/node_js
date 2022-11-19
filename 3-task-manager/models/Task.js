const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // những cái key value nào được setup trên schema thì nó mới chuyển sang DB
    // setting từng key để khi không gửi gì vẫn gửi thành công
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Task', TaskSchema);