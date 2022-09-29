const jwt           = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCTOKENSECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'FORBIDDEN!' })
            console.log("🚀 VerifyToken.js → line 12 → jwt.verify → DECODED ", decoded)
            //req.user    = decoded.UserInfo.userName
            req.id      = decoded.id
            req.user    = decoded.username
            next()
        }
    )

}

module.exports = verifyToken
