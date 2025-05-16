const bcrypt = require('bcrypt');

const hashPassword = async (myPlaintextPassword, saltRounds = 10) => {
    return await bcrypt.hash(myPlaintextPassword, saltRounds);
};

const checkPassword = async (myPlaintextPassword, passwordHash) => {
    return await bcrypt.compare(myPlaintextPassword, passwordHash);
};

module.exports = {
    hashPassword,
    checkPassword
};