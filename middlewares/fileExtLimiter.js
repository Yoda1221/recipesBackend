const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files     = req.files
        const fileExt   = []
        Object.keys(files).forEach(key => {
            fileExt.push(path.extname(files[key].name))
        })
        //** ARE THE FILE EXTENSION ALLOWED? 
        const allowed = fileExt.every(ext => allowedExtArray.includes(ext))
        if (!allowed) {
            const message = `UPLOAD FILE ONLY ${allowedExtArray.toString()} FILES ALLOWED.`.replaceAll(",", ", ")
            return res.status(422).json({ status: "error", message })
        }
        next()
    }
}

module.exports = fileExtLimiter
