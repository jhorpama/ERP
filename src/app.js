const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');

// Initialization 
const app = express();

// Setting
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan('short'));

// Routes 

// Running server
app.listen(app.get('port'), () => {
   console.log(chalk.bgGreen.white('Run server on port', app.get('port')));
});