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
    var UID = req.query.UID
    var SID = req.params.sid

    console.log(UID);

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

    //watchlist check
    const watchlistCheck = await db("watchlist").where({UID: UID, SID: SID})

    if (watchlistCheck.length != 0) {
        result.info.inWatchlist = true
    }
    else {
        result.info.inWatchlist = false
    }

    // send result object to client
    res.json(result)
})

router.get("/search/:query",async (req, res) => {
    console.clear()
    const query = req.params.query

    const dispatch = {query: query}

    const results = await db("shows")
    .whereRaw(`LOWER(title) LIKE ?`, [`%${query}%`])
    .limit(30)

    for (result of results) {
        const metadata = await db("metadata")
        .where({SID: result.ID})
        .select("cover", "genres", "SID")

        //es werden falsch bilder eingetragen

        //console.log(result.title);
        //console.log(metadata[0].SID);

        if(metadata[0] != undefined) {
            result.cover = metadata[0].cover
            result.genres = strToArr(metadata[0].genres)
        }
    }

    dispatch.results = results

    res.end(JSON.stringify(dispatch))
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
    let limit
    if(req.query.limit == undefined) {
        limit = 100
    }
    else {
        limit = req.query.limit
    }
    let input = req.params.genre
    let meta = await db("metadata").where("genres", "like", `%${input}%`).limit(limit)
    for(let x=0; x<meta.length; x++) {
        let s = await db("shows").where({ID:meta[x].SID})
        meta[x].title = s[0].title
        meta[x].genres = strToArr(meta[x].genres)
        meta[x].actors = strToArr(meta[x].actors)
        meta[x].producers = strToArr(meta[x].producers)
        meta[x].directors = strToArr(meta[x].directors)
        meta[x].authors = strToArr(meta[x].authors)
    }
    res.json(meta)
})

router.get("/shows/list/:UID", async (req, res) => {
    const UID = req.params.UID

    const watchlist = await db("watchlist").where({UID: UID}).orderBy("TIMESTAMP", "desc")

    let dispatch = []

    for (showWatched of watchlist) {
        var show = await db("shows").where({ID: showWatched.SID})
        show = show[0]

        var metadata = await db("metadata")
        .where({SID: show.ID})
        .select("cover", "genres")

        metadata = metadata[0]

        show.cover = metadata.cover
        show.genres = strToArr(metadata.genres)

        dispatch.push(show)
    }

    res.end(JSON.stringify(dispatch))
})


router.get("/shows/latest/:UID", async (req, res) => {
    const UID = req.params.UID

    const watched = await db("showswatched").where({UID: UID}).orderBy("TIMESTAMP", "desc")

    let dispatch = []

    for (showWatched of watched) {
        var show = await db("shows").where({ID: showWatched.SID})
        show = show[0]

        var metadata = await db("metadata")
        .where({SID: show.ID})
        .select("cover", "genres")

        metadata = metadata[0]

        show.cover = metadata.cover
        show.genres = strToArr(metadata.genres)

        dispatch.push(show)
    }

    res.end(JSON.stringify(dispatch))
})

//POST

router.post("/shows/list/add", async (req, res) => {
    const data = req.body
    const timestamp = Date.now();
    
    let resp = await db("watchlist").where({SID:data.SID,UID:data.UID})
    if(resp.length == 0) {
        await db("watchlist").insert({UID:data.UID,SID:data.SID,TIMESTAMP:timestamp})
    }
    else if(resp.length == 1) {
        await db("watchlist").where({UID:data.UID,SID:data.SID}).update({TIMESTAMP:timestamp})
    }

    res.end("done")
})



router.post("/shows/latest/add", async (req, res) => {
    const data = req.body
    const timestamp = Date.now();
    
    let resp = await db("showswatched").where({SID:data.SID,UID:data.UID})
    if(resp.length == 0) {
        await db("showswatched").insert({UID:data.UID,SID:data.SID,TIMESTAMP:timestamp})
    }
    else if(resp.length == 1) {
        await db("showswatched").where({UID:data.UID,SID:data.SID}).update({TIMESTAMP:timestamp})
    }

    res.end("done")
})



module.exports = router