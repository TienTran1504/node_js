const express = require('express')
const app = express()
const { products } = require('./data')
app.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    // console.log(req);
    // console.log(req.params);
    console.log(req.params.productID);
    const { productID } = req.params;
    console.log(typeof productID);
    const singleProduct = products.find((product) => product.id === Number(productID));
    if (!singleProduct) {
        return res.status(404).send('Product does not exist');
    }

    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
    res.send('hello');

})

app.get('/api/v1/query', (req, res) => {
    // http://localhost:5000/api/v1/query?name=john&id=4
    console.log(req.query);// { name: 'john', id: '4' }
    // http://localhost:5000/api/v1/query?search=a&limit=2
    const { search, limit } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [] })
    }
    return res.status(200).json(sortedProducts)

})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})