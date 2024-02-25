const { decode } = require("../utils")

const authMiddlware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization']
        console.log(authHeader)
        if(authHeader) {
            const token = authHeader.split('Bearer ')[1]
            const decoded = decode(token)
            req.user = decoded
            return next()
        }
        throw new Error("token not provided")
    }catch(e) {
        res.status(401).json(e.message)   
    }
}

module.exports = authMiddlware