const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT;

// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	next();
// });

// Get the host for Swagger based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? process.env.RENDER_URL : `localhost:${port}`;

// Set swagger document's host and schemes properties
swaggerDocument.host = host;
swaggerDocument.schemes = isProduction ? ['https'] : ['http']; // Use https in production

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(bodyParser.json());
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
