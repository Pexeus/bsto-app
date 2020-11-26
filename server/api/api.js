const express = require("express")

const knex = require("../db/connection")
const db = knex.getDB()

var router = express.Router()

const strToArr = (str) => {
    let arr = str.split(";")
    let res = []
    for(let i=0;i<arr.length;i++) {
        if(arr[i] != "") {
            res.push(arr[i])
        }
    }
    return res
}


router.get("/", (req, res) => {
    res.status(200).json({message:"welcome to the bsto-app API"})
})


router.get("/episodes/:sid", async (req, res) => {
    var seasons = await db("seasons").where({ID_show:req.params.sid})
    var shows = await db("shows").where({ID:req.params.sid})
    var meta = await db("metadata").where({SID:req.params.sid})

    // convert string arrays { one;two;three; } to arrays [one, two, three]
    meta[0].actors = strToArr(meta[0].actors)
    meta[0].producers = strToArr(meta[0].producers)
    meta[0].directors = strToArr(meta[0].directors)
    meta[0].authors = strToArr(meta[0].authors)
    meta[0].genres = strToArr(meta[0].genres)

    // remove ID + SID as it is not needed
    delete meta[0].ID
    delete meta[0].SID

    // initialize result object
    var result = {
        info: meta[0],
        seasons: []
    }

    // set show title
    result.info.title = shows[0].title
    var episodes

    // loop through seasons array
    for(let i=0;i<seasons.length;i++) {
        let season_obj = {
            episodes: []
        }
        episodes = await db("episodes").where({ID_show:req.params.sid,ID_season:i+1})
        // loop through episodes array
        for(let x=0;x<episodes.length;x++) {
            season_obj.episodes.push(episodes[x])
        }
        result.seasons.push(season_obj)
    }
    // send result object to client
    res.json(result)
})

router.get("/genres", async(req, res) => {
    let meta = await db("metadata")
    let result = []
    for(let x=0;x<meta.length;x++) {
        let genres = strToArr(meta[x].genres)
        for(let y=0;y<genres.length;y++) {
            if(result.includes(genres[y])) {

            }
            else {
                result.push(genres[y])
            }
        }
    }
    res.json(result)
})

router.get("/count/genres/:genre", async (req, res) => {
    let input = req.params.genre
    let meta = await db("metadata").where({})
    let allGenres = []
    for(let x=0;x<meta.length;x++) {
        let genres = strToArr(meta[x].genres)
        for(let y=0;y<genres.length;y++) {
            if(allGenres.includes(genres[y]) == true) {

            }
        }
    }
})

router.get("/shows/genre/:genre", async (req, res) => {
    let input = req.params.genre
    let shows = await db("shows")
    let result = []
    for(let x=0;x<shows.length;x++) {
        let meta = await db("metadata").where({SID: shows[x].ID})
        if(meta[0] != undefined) {
            let genres = strToArr(meta[0].genres)
            for(let y=0;y<genres.length;y++) {
                if(genres[y].toLowerCase() == input.toLowerCase()) {
                    let currentshow = await db("shows").where({ID:meta[0].SID})
                    meta[0].title = currentshow[0].title
                    meta[0].genres = genres
                    meta[0].actors = strToArr(meta[0].actors)
                    meta[0].producers = strToArr(meta[0].producers)
                    meta[0].directors = strToArr(meta[0].directors)
                    meta[0].authors = strToArr(meta[0].authors)
                    found=true
                    result.push(meta[0])
                }
            }
        }
    }
    res.json(result)
})


module.exports = router