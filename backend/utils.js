const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

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

const encrpytValue = (value) => {
    try{
        return hashedValue = bcrypt.hash(value, 10)
    } catch(e) {
        throw e
    }
}


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