const express = require('express');
const app = express();
const tasks = require('./routes/task');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
// middleware
app.use(express.static('./public'));
app.use(express.json());// use this to have req.body data


//routes

app.use('/api/v1/tasks', tasks)
// app.get('api/v1/tasks');  - get all the tasks
// app.post('api/v1/tasks');    - create  new task
// app.get('api/v1/tasks/:id'); - get single task
// app.patch('api/v1/tasks/:id');   - update task
// app.delete('api/v1/tasks/:id');  - delete task

app.use(notFound);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 3000;
// PORT=6000 node app.js thì server sẽ chạy trên cổng 6000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // truyền path trên mongodb
        app.listen(port, () => { console.log(`Server is listening on port ${port}`) })
    } catch (error) {
        console.log(error);
    }
}
start();

// khác nhau giữa put và patch method :
// put: nếu đổi một key value mới thì nó sẽ replace toàn bộ cái cũ và mất đi (hay set default) những key value mà không nhập vào (replace)
// patch: chỉ thay đổi đúng key value mà người dùng chọn thay đổi (update)