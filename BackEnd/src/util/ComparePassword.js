const bcrypt = require('bcrypt');

const comparePassword = async (plainPassword, hashedPassword) => {
    return new Promise( (resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword).then(function(result) {
            resolve(result);
        });
    });
}

module.exports = comparePassword;