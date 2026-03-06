const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT;

// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	next();
// });

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`database is listening and node running on port ${port}`);
        });
    }
});
