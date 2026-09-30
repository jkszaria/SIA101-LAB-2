const express = require('express');
const app = express();
const port = 5001;

const users = [
    {
        Id: 1,
        Name: "John Doe",
        email: "john.doe@example.com",
        role: "admin"

    },

    {
        Id: 2,
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "user"
    }
];

app.get('/users', (req, res) => {
    console.log
    ('User service: Returning',
    users.length, 'users');

    res.json({
        service: 'user-service',
        status: 'success',
        count: users.length,
        data: users,
        timestamp: new Date().toISOString()
    });

});

app.get('/ping', (req, res) => {
    res.json(
        {
        status: 'Online',
        message: 'User Service'
        }
    );
});

app.listen(port, () => {
    console.log('='.repeat(40));
    console.log('USER SERCIVE STARTED');
    console.log('='.repeat(40));
    console.log(`PORT: ${port}`);
    console.log(`GET /users ~ return ${users.length} users`);
    console.log('GET /ping ~ Health check');
});