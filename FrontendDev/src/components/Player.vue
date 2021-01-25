<template>
    <div class="playerContainer" @click="closePlayer()">
        <div class="loader">
            <h3>Lade Episoden...</h3>
            <i class="gg-spinner-alt"></i>
        </div>
        <div class="player" v-if="data.show.info != undefined">
            <div class="media">
                <iframe class="showFrame" id="mediaFrame" :src="player.source" allowfullscreen frameborder="0" scrolling="no" sandbox="allow-scripts allow-forms allow-same-origin" allow='autoplay'></iframe>
                <div v-if="player.trailerMode == true" class="playNow" @click="playFirst()">
                    <i class="gg-play-button-o"></i>
                    <p>Jetzt ansehen</p>
                </div>
                <div v-if="player.adSkip == true" class="skipAds">
                    <i class="gg-play-track-next-o"></i>
                </div>
                <div class="closePlayerMobile" @click="closePlayer()">
                    <i class="gg-close"></i>
                </div>
            </div>
            <div class="info">
                <div class="addWatchlist" @click="addPlaylist()">
                    <i v-if="!data.show.info.inWatchlist" class="gg-play-list-add"></i>
                    <i v-if="data.show.info.inWatchlist" class="gg-play-list-check"></i>
                </div>
                <h1 class="showTitle">{{data.show.info.title}}</h1>
                <div class="year">
                    <p>{{data.show.info.fromYear}}</p><p v-if="data.show.info.toYear != 0"> - {{data.show.info.toYear}}</p>
                </div>
                <div class="genres" >
                    <div class="genreTag" v-for="tag in data.show.info.genres" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
                <p class="description">{{data.show.info.desc}}</p>
                <div class="actors" v-if="data.show.info.actors[0] != `undefined`">
                    <h3>Schauspieler:</h3>
                        <div class="infoTag" v-for="tag in data.show.info.actors" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
                <div class="directors" v-if="data.show.info.directors[0] != `undefined`">
                    <h3>Regisseure:</h3>
                        <div class="infoTag" v-for="tag in data.show.info.directors" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
                <div class="producers" v-if="data.show.info.producers[0] != `undefined`">
                    <h3>Produzenten:</h3>
                    <div class="infoTag" v-for="tag in data.show.info.producers" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
                <div class="authors" v-if="data.show.info.authors[0] != `undefined`">
                    <h3>Autoren:</h3>
                    <div class="infoTag" v-for="tag in data.show.info.authors" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
            </div>
            <div class="episodes">
                <div class="seasons">
                    <div class="season" v-for="season in data.show.seasons" :key="season">
                        <h2 :id="`season_` + (parseInt(season.index))">Staffel {{parseInt(season.index)}}</h2>
                        <div class="episode" :id="`https://vivo.sx/embed/` + episode.vivo_link.split(`https://vivo.sx/`)[1]" v-for="episode in season.episodes" :key="episode" @click="setVivoSource(episode.vivo_link), saveAsWatched(episode.ID)">
                            <p>{{episode.title}}</p>
                            <i v-if="episode.watched == true && episode.vivo_link.includes(`error:`) == false" class="gg-eye-alt"></i>
                            <i v-if="episode.vivo_link.includes(`error:`)" class="gg-smile-sad"></i>
                            <i class="gg-play-button-o"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
import {api} from "../config"
import LoginVue from './Login.vue'

export default {
    name: "Player",
    props:{
        showID: Object,
    },
    setup(props, context) {
        const data = reactive({show: {}})
        const player = reactive({source: "", trailerMode: false, adSkip: true})
        var modeGlobal = "hidden"

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }   

        //Initating player
        async function init() {
            console.log("initiating player");
            toggleMode("load")

            player.adSkip = true

            const show = await getShow(props.showID.value)
            console.log(show);
            data.show = show

            await sleep(100)

            let source = false

            if (show.info.hasWatched == true) {
                source = getLatestEpisode(show)
            }
            else {
                source = getTrailer(show)
            }

            setPlayerSource(source)

            //reloading other components
            context.emit('player-updated')
        }

        //setting a default vivo URL as source
        function setVivoSource(url) {
            const vivoCode = url.split("https://vivo.sx/")[1]

            if (player.source == "https://vivo.sx/embed/" + vivoCode) {
                console.log("same source, iframe reloading");

                setPlayerSource("https://www.w3schools.com")
                
                setTimeout(() => {
                    setPlayerSource("https://vivo.sx/embed/" + vivoCode)
                }, 1000);
            }
            else {
                setPlayerSource("https://vivo.sx/embed/" + vivoCode)
            }

            setEpisodePlaying("https://vivo.sx/embed/" + vivoCode)
        }

        //marking an episode as currently playing
        function setEpisodePlaying(id) {
            const playedBefore = document.getElementsByClassName("episodePlaying")
            if (playedBefore.length != 0) {
                playedBefore[0].classList.remove("episodePlaying")
            }

            const target = document.getElementById(id)
            console.log(id);
            console.log(target);
            target.classList.add("episodePlaying")
        }

        //setting an embed URL as source
        function setPlayerSource(source) {
            console.log("new player source: " + source);

            if(source.includes("https://www.youtube.com/")) {
                player.adSkip = false
                player.trailerMode = true
            }
            else {
                player.adSkip = true
                player.trailerMode = false

                const episode = document.getElementById(source)
                episode.click()
            }

            console.log("trailerMode: " + player.trailerMode);

            //calculating frame height (16:9 format)
            const frame = document.getElementById("mediaFrame")
            frame.addEventListener("load" , () => {
                if(modeGlobal == "load") {
                    const width = event.target.offsetWidth
                    event.target.style.height = width * 0.56 + "px"

                    //toggling to active state
                    toggleMode("active")
                }
            })

            player.source = source
        }
        
        //play the first episode of the show and disable player mode
        function playFirst() {
            console.log("playing first episode");

            const link = data.show.seasons[0].episodes[0].vivo_link
            const code = link.split("https://vivo.sx/")[1]
            const url = `https://vivo.sx/embed/${code}`

            const firstEpisode = document.getElementById(url)
            firstEpisode.click()
        }

        //get embed URL of trailer
        function getTrailer(show) {
            const code = show.info.trailer.split("https://www.youtube.com/watch?v=")[1]
            
            return `https://www.youtube.com/embed/${code}?autoplay=1&showinfo=0&controls=0`
        }

        //get latest episode by timestaps (watched last)
        function getLatestEpisode(show) {
            console.log("loading latest episode");
            let link = ""


            //timestamp check
            let timestampCheck = 0

            //looking for last watched episode
            for (let season in show.seasons) {
                for (let episode in show.seasons[season].episodes) {
                    let currentEpisode = show.seasons[season].episodes[episode]
                    
                    if (currentEpisode.watchedAt > timestampCheck) {
                        link = currentEpisode.vivo_link
                        timestampCheck = currentEpisode.watchedAt
                    }
                }
            }

            const code = link.split("https://vivo.sx/")[1]
            const url = `https://vivo.sx/embed/${code}`

            return url
        }

        //toggling player status (active, inactive, etc...)
        async function toggleMode(mode) {
            const container = document.getElementsByClassName("playerContainer")[0]
            const player = document.getElementsByClassName("player")[0]
            const loader = document.getElementsByClassName("loader")[0]

            if (modeGlobal != mode) {
                console.log("setting mode to: " + mode);

                if (mode == "load") {
                    container.classList.add("playerContainerVisible")
                    loader.classList.add("loaderVisible")
                    container.scrollTo(0, 0)
                }
                if (mode == "hidden") {
                    player.classList.remove("playerVisible")
                    await sleep(200)

                    container.classList.remove("playerContainerVisible")
                    loader.classList.remove("loaderVisible")

                    setPlayerSource("")
                }
                if (mode == "active") {
                    loader.classList.remove("loaderVisible")
                    player.classList.add("playerVisible")
                    player.scrollTo(0, 0)
                    container.scrollTo(0, 0)
                }

                modeGlobal = mode
            }
            else {
                console.log(`mode ${mode} is already active`);
            }
        }

        //getting dataset of show by id and user
        async function getShow(id) {
            const token = localStorage.jwt
            const user = decodeToken(token)

            const response = await fetch(api + `episodes/${props.showID.value}?UID=${user.id}`)
            const show = await response.json()

            return show
        }

        //hess shit
        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }

        function closePlayer() {
            console.log(event.target.className);

            if (event.target.className.includes("playerContainerVisible") || event.target.className.includes("closePlayerMobile") || event.target.className.includes("gg-close")) {
                toggleMode("hidden")

                //reloading other components
                context.emit('player-updated')
            }
        }

        //save an episode as watched (user specified)
        function saveAsWatched(id) {
            const token = localStorage.jwt
            const user = decodeToken(token)

            let target = event.target

            while (target.tagName != "DIV") {
                target = target.parentElement
            }

            if (target.querySelector("i") == null && event.target.querySelector(".gg-smile-sad") == null) {
                const icon = document.createElement("i")
                icon.classList.add("gg-eye-alt")

                icon.style.display = "inline-block"
                icon.style.float = "right"

                target.appendChild(icon)
            }

            let fetchOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({UID: user.id, EID: id})
            }

            fetch(api + "episodes/watched/add", fetchOptions).then(resp => {
                console.log(`episode ${id} saved as watched`);
            })
        }

        //add show to watchlist
        function addPlaylist() {
            const token = localStorage.jwt
            const user = decodeToken(token)

            let fetchOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({UID: user.id, SID: Number(props.showID.value)})
            }

            fetch(api + "shows/list/add", fetchOptions).then(async resp => {
                data.show = await getShow(props.showID.value)
            })
        }

        //watching for prop changes, initate player on change
        watch(() => props.showID.value, async () => {
            console.clear()
            console.log("change dedected");
            init()
        })

        //recalc 1:9 on window resize
        window.addEventListener("resize", () => {
            if (modeGlobal == "active") {
                const frame = document.getElementById("mediaFrame")

                const width = frame.offsetWidth
                frame.style.height = width * 0.56 + "px"
            }
        })

        return {closePlayer, data, player, setVivoSource, saveAsWatched, playFirst, addPlaylist}
    }
}
</script>

<style scoped>
    .playerContainer {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.658);
        z-index: 100;
        text-align: center;
        visibility: hidden;
        opacity: 0;
        overflow: scroll;
    }

    .info p {
        display: inline;
    }

    .info h3 {
        display: inline-block;
        font-weight: 500;
        margin-top: 10px;
    }

    .playerContainerVisible {
        visibility: visible;
        opacity: 1;
    }

    .loader {
        background-color: var(--dark);
        border-radius: 5px;
        font-size: large;
        box-shadow: 0px 3px 10px black;
        margin-top: 40vh;
        transform: scale(1);
        height: auto;
        padding: 30px;
        position: absolute;
        visibility: hidden;
        display: inline-block;
        z-index: -100;
        transform: scale(.9);
        width: 300px;
        left: calc(50% - 150px);
    }

    .loaderVisible {
        opacity: 1;
        z-index: 100;
        visibility: visible;
        transform: scale(1);
        left: calc(50% - 150px);
        z-index: -100;
    }

    .player {
        width: 800px;
        background-color: var(--dark);
        border-radius: 10px;
        display: inline-block;
        margin-top: 0px;
        box-shadow: 0px 0px 80px black;
        z-index: 5;
        transform: scale(.5);
        opacity: 0;
    }

    .playerVisible {
        transform: scale(1);
        opacity: 1;
        margin-top: 80px;
        margin-bottom: 80px;
    }

    @media only screen and (max-width: 900px) {
        .player {
            width: 100%;
            background-color: var(--dark);
            border-radius: 0;
            display: inline-block;
            box-shadow: 0;
            z-index: 5;
            transform: scale(.5);
            opacity: 0;
        }

        .playerVisible {
            transform: scale(1);
            opacity: 1;
            margin-top: 0;
            margin-bottom: 0;
        }

        iframe {
            border-radius: 0;
        }

        .closePlayerMobile {
            position: absolute;
            padding: 9px;
            display: inline-block;
            background-color: var(--bright);
            top: 12px;
            left: 12px;
            border-radius: 100%;
            opacity: .9;
            cursor: pointer;
            box-shadow: 0px 0px 3px var(--shadow);
        }

        .closePlayerMobile:hover {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    @media only screen and (min-width: 900px) {
        .closePlayerMobile {
            display: none;
        }
    }

    @media only screen and (min-width: 1300px) {
        .player {
            width: 1000px;
        }
    }

    .media {
        width: 100%;
        z-index: 10;
        display: block;
        position: relative;
    }

    .playNow {
        position: absolute;
        padding: 12px;
        padding-left: 20px;
        padding-right: 20px;
        display: inline-block;
        background-color: var(--bright);
        bottom: 30px;
        right: 30px;
        border-radius: 10px;
        opacity: .9;
        cursor: pointer;
        box-shadow: 0px 0px 3px var(--shadow);
    }

    .playNow:hover {
        opacity: 1;
    }

    .playNow p {
        font-weight: bold;
        margin-left: 15px;
    }

    .playNow * {
        display: inline-block;
        vertical-align: middle;
        color: var(--white);
        cursor: pointer;
    }

    .skipAds {
        position: absolute;
        display: inline-block;
        background-color: transparent;
        top: 20px;
        right: 20px;
        opacity: .9;
        cursor: pointer;
    }

    .skipAds i {
        display: inline-block;
        transform: scale(1.4);
    }

    .skipAds i:hover {
        transform: scale(1.5);
        color: var(--bright);
    }

    .skipAds i {
        margin-left: 20px;
    }

    iframe {
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    @media only screen and (max-width: 900px) {
        iframe {
            border-radius: 0;
        }
    }

    .info {
        text-align: left;
        padding: 10px;
        margin-bottom: 20px;
        position: relative;
    }

    .addWatchlist {
        position: absolute;
        top: 18px;
        right: 18px;
        cursor: pointer;
        padding: 10px;
        transform: scale(1.4);
    }

    .addWatchlist:hover {
        transform: scale(1.5);
    }

    .addWatchlist .gg-play-list-check {
        color: var(--bright);
    }

    .genres {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .genreTag{
        background-color: var(--bright);
        border-radius: 18px;
        color: #394867;
        display: inline-block;
        margin-right: 6px;
        margin-bottom: 6px;
        font-weight: bold;
        padding: 4px;
        padding-left: 8px;
        padding-right: 8px;
    }

    .episodes {
        text-align: left;
    }

    .episodes h2 {
        padding-left: 10px;
    }

    .episodes h1 {
        padding-left: 20px;
        margin-bottom: 20px;
    }

    .season {
        margin-bottom: 30px;
    }

    .episode {
        width: 100%;
        text-align: left;
        padding: 10px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid var(--lightshadow);
        cursor: pointer;
    }

    .episode:hover {
        background-color: var(--mid);
    }

    .season i {
        float: right;
    }

    .episode * {
        display: inline-block;
    }

    .episode .gg-play-button-o {
        display: none;
    }

    .episodePlaying {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .episodePlaying * {
        color: var(--bright);
        font-weight: bold;
    }

    .episodePlaying .gg-play-button-o {
        display: inline-block;
        float: left;
        margin-right: 10px;
    }

    .iconWrapper {
        width: 300;
        text-align: center;
    }

    .loader h3 {
        display: block;
        font-weight: 400;
    }

    .loader i {
        display: inline-block;
        padding-bottom: 40px;
        padding-top: 25px;
    }

</style>