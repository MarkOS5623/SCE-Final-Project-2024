
const jwt = require('jsonwebtoken')

const encode = (userDetails) => {
    const token = jwt.sign(userDetails, "hamburger")
    return token
}

const decode = (token) => {
    const userDetails = jwt.decode(token)
    return userDetails
}

module.exports = {
    encode,
    decode
}