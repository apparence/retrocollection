const pool = require('../data/config');
const bodyParser = require('body-parser');

const router = app => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) {
                throw error;
            }
            response.send(result);
        });
    });
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM users WHERE ID = ?', id, (error, result) => {
            if (error) {
                throw error;
            }
            response.send(result);
        });
    });
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [request.body.name, request.body.email, request.body.password], (error, result) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });
    app.put('/users/:id', (request , response) => {
        const id = request.params.id;
        pool.query('UPDATE users SET name = ? WHERE ID = ?', [request.body.name, id], (error, result) => {
            if (error) {
                throw error;
            }
            response.send('User updated successfully.');
        })
    });
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE ID = ?', id, (error, result) => {
            if (error) {
                throw error;
            }
            response.send("user successfully delete");
        })
    });
}

module.exports = router;
