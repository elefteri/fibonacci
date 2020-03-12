const keys = require('./keys');

// Express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

//Postgress client setup
const { pool } = require('pg');
const pgClient = new pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.query('CREATE TABLE IF NOT EXISTS FIB_SEQUENCE (FIB_INDEX INT)')
        .catch(err => console.log(err));

//redis client setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

//express route handlers
app.get('/', (req, res) => {
    res.send('Hi There !');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT FIB_INDEX FROM FIB_SEQUENCE');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('fib_values', (err, fib_sequence) => {
        res.send(fib_sequence);
    }); 
});

app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hset('fib_values', index, 'Nothing yet');
    redisPublisher.publish('insert', index);
    // pgClient.query('INSERT INTO FIB_SEQUENCE(FIB_INDEX) VALUES($1)', [index]);
    pgClient.query(`INSERT INTO FIB_SEQUENCE (FIB_INDEX) VALUES (${index})`);

    res.send({ working: true });
});

app.listen(5000, err => {
    console.log(err);
});
