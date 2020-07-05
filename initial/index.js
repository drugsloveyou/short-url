const mongoInitial = require('./mongoInitial');
const apiIntial = require('./apiInitial');

function initial(app){
    mongoInitial();
    apiIntial(app);
}

module.exports = initial;