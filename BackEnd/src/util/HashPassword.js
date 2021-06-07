const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    return new Promise( (resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err)
                    reject("Error while hashing the password");
                resolve(hash);    
            });
        });
    });
}

module.exports = hashPassword;