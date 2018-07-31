let crypto = require('crypto');

let config = require('../../config.json');

const decrypt = (encryptedPassword) => {
    let decipher = crypto.createDecipher(config.client_side_encryption.algorithm,
        config.client_side_encryption.password);
    let password = decipher.update(encryptedPassword , 'hex', 'utf8');
    password += decipher.final('utf8');
    return password;
}

module.exports = decrypt;
