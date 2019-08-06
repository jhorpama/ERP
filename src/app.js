const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');

// Initialization 
const app = express();
require('./database');

// Setting
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes 
app.use(require('./routes/index'));

// Running server
app.listen(app.get('port'), () => {
   console.log(chalk.bgGreen.white('Run server on port', app.get('port')));
});