const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "lol_its_secret";

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to DB');
        db = client.db('crossplayable-games-db');

        app.listen(port, () => {
            console.log('Server runningon port ${port}');
            
        });
    })
    .catch(error => console.error(error));

app.use(express.json());

app.get('/games', (req, res) => {
    db.collection('games').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => res.status(500).json({ error: error.message }));
});

app.post('/games', (reqe, res) => {
    const game = req.body;
    db.collection('games').insertOne(game)
        .then(result => {
            res.status(201).json(result.ops[0]);
        })
        .catch(error => res.status(500).json({ error: error.message }));
});