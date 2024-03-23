const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// decode and encode functions for user tokens
const encode = (userDetails) => { 
    try{
        return token = jwt.sign(userDetails, "hamburger")
    } catch(e) {
        throw e
    }
}

const decode = (token) => {
    try{
        return userDetails = jwt.decode(token)
    } catch(e) {
        throw e
    }
}
//encrypt and decrypt function for values mostly user passwords
const encrpytValue = async (value) => {
    try {
        const hashedValue = await bcrypt.hash(value, 10);
        return hashedValue;
    } catch (e) {
        throw e;
    }
};

const decrpytValue = (value, compared) => {
    try{
        return bcrypt.compare(value, compared)
    } catch(e) {
        throw e
    }
}

module.exports = {
    encode,
    encrpytValue,
    decode,
    decrpytValue
}