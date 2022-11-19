require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./model/product_model');

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log("Success");
        process.exit(0) // dùng để exit process start 0: everything went well  không cần phải ctrl +C
    } catch (error) {
        console.log(error);
        process.exit(1) // 1: error code
    }
}

start()