var express = require('express'),
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
const client = new pg.Client(connect, function (err) {
    if (err) return console.error('error fethcing data', err);
});

app.get('/statistic', function (req, res) {
    client.connect();
    client.query('SELECT * FROM STATISTICS', function (err, result) {
        if (err) return console.error('Error', err);
        console.info(result.rows);
        res.send(result.rows);
    });
});

app.post('/statistic', function (req, res) {
    client.connect();
    client.query('INSERT INTO STATISTICS (NAME,SIZE,TIME,MINE) VALUES ($1,$2,$3,$4)',
        [req.body.name, req.body.size, req.body.time, req.body.mine], function (err) {
            if (err) return console.error('Error', err);
            res.sendStatus(200);
        });
});

app.listen(3001, function () {
    console.log('listen port: 3001');
});﻿