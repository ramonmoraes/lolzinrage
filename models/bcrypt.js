const bcrypt = require('bcrypt');
const saltRounds = 10;

const cryptString = (string) => {
  return ( new Promise(function(resolve, reject) {

    bcrypt.hash(string, saltRounds, function(err, hash) {
      (err) ? reject(err) : resolve(hash)
    });

  }) )
}

const unCrypt = (password,hash) => {
  return ( new Promise(function(resolve, reject) {

    bcrypt.compare(password, hash, function(err, res) {
      (err) ? reject(err) : resolve(res)
    });

  }) );

}

module.exports = {
  cryptString:cryptString,
  unCrypt : unCrypt
}
