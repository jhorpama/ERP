const mongoose = require('mongoose');
const chalk = require('chalk');

const URI = 'mongodb://localhost/bodega';

mongoose.connect(URI, {
   useNewUrlParser: true
})
.then(db => { console.log(chalk.bgBlue.white('DB is connect')) })
.catch(err => { console.log(err) });

module.exports = mongoose;