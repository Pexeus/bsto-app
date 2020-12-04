const bcrypt = require("bcrypt")
const saltRounds = 20


module.exports = {
    hashPW: (plain) => {
        return new Promise(async resolve => {
            let hashed = await bcrypt.hash(plain, saltRounds)
            resolve(hashed)
        })
    },
    compPW: (plain, hashed) => {
        return new Promise(async resolve => {
            let resp = await bcrypt.compare(plain, hashed)
            resolve(resp)
        })
    }
}