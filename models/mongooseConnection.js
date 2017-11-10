var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.Promise = global.Promise; // Parar warning de Promises

// mongoose.connect('mongodb://devadmin:devadmin@ds149905.mlab.com:49905/lolrage',{useMongoClient: true});
mongoose.connect('mongodb://devadmin:devadmin@ds155315.mlab.com:55315/heroku_dg7dclm9',{useMongoClient: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

module.exports = {
  db:db,
};
