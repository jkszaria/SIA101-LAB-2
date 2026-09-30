const express = require('express');
const app = express();
const port = 5003;

const order = [
    {
        Id: 1,
        UserId: 1,
        productID: 1,
        quantity: 1,
        totalPrice: '120000',
        status: 'processing'
    },

    {
        Id: 2,
        UserId: 2,
        productID: 2,
        quantity: 1,
        totalPrice: '70000',
        status: 'shipped'
    },

    {
        Id: 3,
        UserId: 3,
        productID: 3,
        quantity: 3,
        totalPrice: '210000',
        status: 'processing'
    }
];


app.get('/orders', (req, res) => {
    console.log
    ('order service: Returning',
    order.length, 'order');

    res.json({
        service: 'order-service',
        status: 'success',
        count: order.length,
        data: order,
        timestamp: new Date().toISOString()
    });

});

app.get('/ping', (req, res) => {
    res.json(
        {
        status: 'Online',
        message: 'order Service'
        }
    );
});

app.listen(port, () => {
    console.log('='.repeat(40));
    console.log('ORDER SERCIVE STARTED');
    console.log('='.repeat(40));
    console.log(`PORT: ${port}`);
    console.log(`GET /order ~ return ${order.length} order`);
    console.log('GET /ping ~ Health check');
});