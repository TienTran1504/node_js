const Product = require('../model/product_model');

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Product.find({ price: { $gt: 30 } }).sort('price').select('name price');
    res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}

    if (featured) { // xử lý khi có thêm featured vào query
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) { // xử lý khi có thêm company vào query
        queryObject.company = company;
    }
    if (name) { // xử lý khi có thêm name vào query : chỉ cần tên chữ cái trong biến name có trong tên thì sẽ đc lấy ra
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) { //so sánh lớn bé khi dùng numericFilters
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-') // tách ra vd price $gt 30
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    console.log(queryObject);
    let result = Product.find(queryObject); // dùng let để nếu có sort sẽ thay đổi biến được

    if (sort) { // sắp xếp 
        const sortList = sort.split(',').join(' '); // khi nhập query thì sẽ name,price nên cần chuyển đổi thành name price để gắn vào hàm
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt');
    }
    if (fields) { // lọc ra lấy key nào
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit) //limit giới hạn số lượng object trả ra, skip là bỏ qua những object đầu

    const products = await result
    res.status(200).json({ nbHits: products.length, products })
}

module.exports = { getAllProducts, getAllProductsStatic };

//?sort=name => sắp xếp theo thứ tự a-> z hay ?sort=-price sắp xếp theo giá lớn đến nhỏ
//select(field) để lọc ra những key muốn nhìn thấy
//4:40:00

//$gt: <number1> , $lt:<number2> lấy ra những object mà thoả điều kiện lớn hơn number1 , bé hơn number2