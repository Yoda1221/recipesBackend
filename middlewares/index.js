const LoginLimiter          = require('../middlewares/LoginLimiter')
const fileExtLimiter        = require('../middlewares/fileExtLimiter')
const fileSizeLimiter       = require('../middlewares/fileSizeLimiter')
const filesPayloadExists    = require('../middlewares/filesPayloadExists')

module.exports = {
    fileExtLimiter, fileSizeLimiter, filesPayloadExists, LoginLimiter
}