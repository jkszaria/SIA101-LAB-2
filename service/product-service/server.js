const express = require('express');
const app = express();
const port = 5002;

const product = [
    {
        Id: 1,
        product: 'Lenovo',
        price: '60,000',
        category: 'Laptop',
        instock: true
    },

    {
        Id: 2,
        product: 'Acer',
        price: '70,000',
        category: 'Laptop',
        instock: true
    }
];

app.get('/products', (req, res) => {
    console.log
    ('product service: Returning',
    product.length, 'product');

    res.json({
        service: 'product-service',
        status: 'success',
        count: product.length,
        data: product,
        timestamp: new Date().toISOString()
    });

});

app.get('/ping', (req, res) => {
    res.json(
        {
        status: 'Online',
        message: 'product Service'
        }
    );
});

app.listen(port, () => {
    console.log('='.repeat(40));
    console.log('PRODUCT SERCIVE STARTED');
    console.log('='.repeat(40));
    console.log(`PORT: ${port}`);
    console.log(`GET /product ~ return ${product.length} product`);
    console.log('GET /ping ~ Health check');
});