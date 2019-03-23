const express = require('express'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    cors = require('cors'),
    app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Connect to DB
const connect = "postgres://vasenking:123123123@localhost/sapperdb";
const client = new pg.Client(connect, (err) => {
    if (err) return console.error('error connect to DB', err);
});

// Get statistic list
app.get('/statistic', function (req, res) {
    client.connect();
    client.query('SELECT * FROM STATISTICS', (err, result) => {
        if (err) return console.error('Error get', err);
        console.info(result.rows);
        res.send(result.rows);
    });
});

// Post statistic item
app.post('/statistic', function (req, res) {
    client.connect();
    client.query('INSERT INTO STATISTICS (NAME,SIZE,TIME,MINE) VALUES ($1,$2,$3,$4)',
        [req.body.name, req.body.size, req.body.time, req.body.mine], (err) => {
            if (err) return console.error('Error post', err);
            res.sendStatus(200);
        });
});

// Listen port
app.listen(3001, () => {
    console.log('listen port: 3001');
});﻿