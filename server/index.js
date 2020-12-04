const express = require("express")
const app = express()

const knex = require("./db/connection")
const db = knex.getDB()

const jwt = require("modjwt")

const bcrypt = require("bcrypt")
const saltRounds = 10

const cors = require("cors")

const staticRoot = "../client"

const PORT = process.env.port || 96

app.use(express.json())
app.use(express.static(staticRoot))
app.use(cors())

app.use("/api", require("./api/api"))

app.listen(PORT, () => {
    console.clear()
    console.log(`> server started`)
    console.log(`> listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.status(200).json({message:"bsto-app backend"})
})
app.get("/hash/:plain", async (req, res) => {
    let result = await bcrypt.hash(req.params.plain, saltRounds)
    res.status(200).end(result)
})
app.post("/login", async (req, res) => {
    let input = req.body
    if(input.username && input.password) {
        // username found
        let results = await db("users").where({name: input.username})
        let passCheck = await bcrypt.compare(input.password, results[0].password)

        const user = await db("users").where({name: input.username})
        console.log(user);

        if(passCheck == true) {
            // password correct
            let lifetime = 86400 * 7// 7 days (seconds)
            let token = jwt.createToken({id: user[0].ID, name: user[0].name}, lifetime)
            res.json(token)
        }
        else {
            // wrong password
            res.status(400).json({password:false})
        }
    }
    else {
        // username not found
        res.status(400).json({username:false})
    }
})