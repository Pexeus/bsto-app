const express = require("express")
const session = require("express-session")
const app = express()

const knex = require("./db/connection")
const db = knex.getDB()

const bcrypt = require("./mybcrypt")
const cors = require("./cors")

const PORT = process.env.port || 96

// SESSION STUFF
const SESS_NAME = "sid"
const SESS_SECRET = "$2b$10$a64NVceTGIElwFFZve3EUOpY5QUVRqhS6xgtyhPRdl6HH8qIAkEEm"
const SESS_LIFETIME = 1000 * 60 * 60 * 2 // 2h (ms)
const SESS_SEC = false

var sess = {}

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: SESS_SEC
    }
}))

app.use(express.json())

app.use('/', cors)

//api stuff
app.use("/api", require("./api/api"))

app.listen(PORT, () => {
    console.clear()
    console.log(`> server started`)
    console.log(`> listening on port ${PORT}`);
})

app.post("/login", (req, res) => {

})

app.post("/logout", (req, res) => {

})