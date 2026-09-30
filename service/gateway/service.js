const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

const SERVICE = {
    users: 'http://localhost:5001/users',
    products: 'http://localhost:5002/products',
    orders: 'http://localhost:5003/orders'
};

app.use(cors());
app.use(express.json());

app.get('/api/dashboard', async (req, res) => {
    console.log('Dashboard requested - aggregating data...');
    try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
            axios.get(SERVICE.users),
            axios.get(SERVICE.products),
            axios.get(SERVICE.orders)
        ]);

        const dashboard = {
            timestamp: new Date().toISOString(),
            summary: {
                totalUsers: usersRes.data.count || 0,
                totalProducts: productsRes.data.count || 0,
                totalOrders: ordersRes.data.count || 0
            },
            users: usersRes.data.data || [],
            products: productsRes.data.data || [],
            orders: ordersRes.data.data || []
        };

        console.log('Dashboard:', dashboard.summary);
        res.json(dashboard);
    } catch (error) {
        console.error('Aggregation error:', error.message);
        res.status(500).json({
            error: 'Failed to fetch data from one or more services',
            details: error.message
        });
    }
});

app.get('/api/status', async (req, res) => {
    console.log('Checking service status...');
    try {
        const results = await Promise.all([
            axios.get('http://localhost:5001/ping').then(() => ({ name: 'users', status: 'online' })).catch(() => ({ name: 'users', status: 'offline' })),
            axios.get('http://localhost:5002/ping').then(() => ({ name: 'products', status: 'online' })).catch(() => ({ name: 'products', status: 'offline' })),
            axios.get('http://localhost:5003/ping').then(() => ({ name: 'orders', status: 'online' })).catch(() => ({ name: 'orders', status: 'offline' }))
        ]);

        const allOnline = results.every(s => s.status === 'online');

        res.json({
            gateway: 'online',
            allOnline: allOnline,
            services: results
        });
    } catch (error) {
        res.status(500).json({ error: 'Status check failed' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(SERVICE.users);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(SERVICE.products);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const response = await axios.get(SERVICE.orders);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('API GATEWAY (HUB) STARTED');
    console.log('='.repeat(50));
    console.log(`Gateway URL: http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('ENDPOINTS:');
    console.log(`Dashboard: http://localhost:${PORT}/api/dashboard`);
    console.log(`Status: http://localhost:${PORT}/api/status`);
    console.log(`Users: http://localhost:${PORT}/api/users`);
    console.log(`Products: http://localhost:${PORT}/api/products`);
    console.log(`Orders: http://localhost:${PORT}/api/orders`);
    console.log('='.repeat(50));
});