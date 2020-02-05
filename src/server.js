import { variables } from './config/config.variables';
import bodyParser from 'body-parser';
const log = require('morgan')('dev');
import express from 'express';
const app = express();

import cors from 'cors';

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Mongo Database
import db from './config/config.database';

// Call the database connectivity function
db();

// Configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const bodyParserRaw = bodyParser.raw();
const bodyParserText = bodyParser.text();

// Configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(bodyParserRaw);
app.use(bodyParserText);
app.use(cors());

// Initialise express router
const router = express.Router();
app.use('/api', router);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.send('Hello World! User Management in Action'));
// request to handle undefined or all other routes
app.use('*', function(req, res) {
	// logger.info("users route");
	res.send('App works!!!!!');
});

const PORT = process.env.PORT || 4040;
module.exports = app.listen(PORT, () => {
	console.log(`Server is running on ${PORT} port.`);
});
