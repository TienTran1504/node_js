require('dotenv').config(); // access env variable
require('express-async-errors'); // help not to need to set up async middleware ( dont have to try, catch)

const express = require('express');
const app = express();

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();