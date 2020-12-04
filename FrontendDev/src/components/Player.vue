<template>
    <div class="playerContainer" @click="closePlayer()">
        <div class="loader">
            <h3>Lade Episoden...</h3>
            <i class="gg-spinner-alt"></i>
        </div>
        <div class="player">
            <div class="left">
                <div class="media">
                    <iframe id="mediaFrame" :src="player.source" allowfullscreen frameborder="0" scrolling="no" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
                </div>
                <div class="info" v-if="data.show.info != undefined">
                    <h1 class="showTitle">{{data.show.info.title}}</h1>
                    <div class="year">
                        <p>{{data.show.info.fromYear}}</p><p v-if="data.show.info.toYear != 0"> - {{data.show.info.toYear}}</p>
                    </div>
                    <div class="genres" >
                        <div class="genreTag" v-for="tag in data.show.info.genres" :key="tag">
                            <p>{{tag}}</p>
                        </div>
                    </div>
                    <div class="addWatchlist" @click="addPlaylist()">
                        <i v-if="!data.show.info.inWatchlist" class="gg-play-list-add"></i>
                        <i v-if="data.show.info.inWatchlist" class="gg-play-list-check"></i>
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
            </div>
            <div class="episodes">
                <div class="selectSeason">
                    <select>
                        <option v-for="season in data.show.seasons" :key="season">Staffel {{parseInt(season.index) + 1}}</option>
                    </select>
                </div>
                <div class="seasons">
                    <div class="season" v-for="season in data.show.seasons" :key="season">
                        <h2>Staffel {{parseInt(season.index) + 1}}</h2>
                        <div class="episode" v-for="episode in season.episodes" :key="episode" @click="setMediaSource(episode.vivo_link), saveAsWatched(episode.ID)">
                            <p>{{episode.title}}</p>
                            <i v-if="episode.watched == true && episode.vivo_link.includes(`error:`) == false" class="gg-eye-alt"></i>
                            <i v-if="episode.vivo_link.includes(`error:`)" class="gg-smile-sad"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
export default {
    name: "Player",
    props:{
        showID: Object,
    },
    methods: {

    },
    setup(props, context) {
        const data = reactive({show: {}})
        const seasonNr = reactive({value: 0})
        const player = reactive({source: ""})

        const host = "http://bstoapp.staging.it-tf.ch/api/"

        watch(() => props.showID.value, async () => {
            loadShow() 
        })

        async function loadShow() {
            document.getElementsByClassName("playerContainer")[0].style.display = "block"

            const token = localStorage.jwt
            const user = decodeToken(token)

            const response = await fetch(host + `episodes/${props.showID.value}?UID=${user.id}`)
            const show = await response.json()

            console.log(show);

            let playerActive = false

            for (let season in show.seasons) {
                show.seasons[season].index = season

                for (let episode in show.seasons[season].episodes) {
                    show.seasons[season].episodes[episode].index = episode

                    if (playerActive == false) { //hier watched check
                        playerActive = true

                        const vivoCode = show.seasons[season].episodes[episode].vivo_link.split("https://vivo.sx/")[1]
                        
                        player.source = "https://vivo.sx/embed/" + vivoCode
                    }
                }
            }

            data.show = show

            seasonNr.value = 0

            const iframe = document.getElementById("mediaFrame")
            iframe.addEventListener("load", () => {
                document.getElementsByClassName("player")[0].style.display = "block"
                document.getElementsByClassName("loader")[0].style.display = "none"


                const width = event.target.offsetWidth

                event.target.style.height = width * 0.56 + "px"

                const infos = document.getElementsByClassName("info")[0]
                infos.style.height = document.getElementsByClassName("player")[0].offsetHeight - width * 0.56 -60 + "px"
            })
        }

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

            fetch(host + "shows/list/add", fetchOptions).then(resp => {
                console.log(resp);
                loadShow()
            })
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }

        function setMediaSource(url) {

            const vivoCode = url.split("https://vivo.sx/")[1]
            player.source = "https://vivo.sx/embed/" + vivoCode
        }

        function saveAsWatched(id) {
            const token = localStorage.jwt
            const user = decodeToken(token)

            if (event.target.querySelector("i") == null && event.target.querySelector(".gg-smile-sad") == null) {
                event.target.innerHTML += "<i class=gg-eye-alt></i>"
            }

            let fetchOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({UID: user.id, EID: id})
            }

            fetch(host + "episodes/watched/add", fetchOptions).then(resp => {
                console.log(resp);
            })
        }

        function closePlayer() {
            if (event.target.className == "playerContainer") {
                data.show = {}

                document.getElementsByClassName("playerContainer")[0].style.display = "none"
                player.source = ""
            }
        }

        return {data, seasonNr, player, setMediaSource, closePlayer, addPlaylist, saveAsWatched}
    },
    mounted(){

    }
}
</script>

<style scoped>
    .addWatchlist {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        padding: 10px;
    }

    .addWatchlist:hover {
        transform: scale(1.1);
    }

    .playerContainer {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.658);
        z-index: 100;
        text-align: center;
        display: none;
    }

    .loader {
        padding: 30px;
        background-color: var(--dark);
        display: inline-block;
        border-radius: 5px;
        margin-top: 40vh;
        font-size: large;
        box-shadow: 0px 3px 10px black;
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
        margin-left: -40px;
        padding-bottom: 40px;
        padding-top: 25px;
    }

    .player {
        padding: 30px;
        background-color: var(--dark);
        display: inline-block;
        border-radius: 5px;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 5vh;
        margin-bottom: 5vh;
        height: calc(100vh - 10vh);
        text-align: left;
        border-radius: 5px;
        display: none;
        box-shadow: 0px 3px 10px black;
    }

    .media {
        width: 100%;
        vertical-align: top;
        border-radius: 5px;
    }

    iframe {
        width: 100%;
        border-radius: 5px;
    }

    .left {
        width: 50%;
        display: inline-block;
        vertical-align: top;
    }

    .episodes {
        display: inline-block;
        width: 50%;
        vertical-align: top;
        overflow-y: scroll;
        max-height: 100%;
    }

    .info {
        overflow-y: scroll;
        position: relative;
    }

    @media only screen and (max-width: 1000px) {
        .left {
            width: 100%;
            vertical-align: top;
        }

        .media {
            position: sticky;
            top: 0;
            border-radius: 0;
        }

        iframe {
            border-radius: 0;
        }

        .episodes {
            width: 100%;
            height: auto;
            overflow: scroll;
        }

        .player {
            overflow: scroll;
            padding: 0px;
            margin: 0;
            height: 100%;
        }

        .info {
            margin: 5px;
        }
    }

    .showTitle {
        font-size: 30pt;
    }

    .year {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: large;
    }

    .genres {
        margin-bottom: 10px;
        margin-top: 5px;
    }

    p {
        display: inline;
    }

    .season {
        width: calc(100% - 30px);
        margin: 15px;
        border-bottom: 0;
        box-shadow: 0px 0px 6px var(--shadow);
        border-radius: 5px;
        border: thin solid var(--lightshadow);
        border-bottom: 0;
        border-radius: 5px;
        background-color: var(--brightdark);
    }

    .season h2{
        padding: 10px;
        border-bottom: thin solid var(--lightshadow);
        box-shadow: 0px 0px 3px var(--lightshadow);
        background-color: var(--dark);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .episode {
        width: 100%;
        padding: 10px;
        font-size: large;
        border-bottom: thin solid var(--lightshadow);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }

    .episode i {
        color: lightgray;
    }

    .episode p {
        color: lightgray;
    }

    .episode:hover {
        background-color:  var(--bright);
        border-radius: 5px;
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

    h3 {
        display: inline-block;
    }

    .infoTag {
        display: inline-block;
        margin: 3px;
        margin-top: 6px;
    }

    @keyframes spinneralt {
    0% { transform: rotate(0deg) }
    to { transform: rotate(359deg) }
    }
    .gg-spinner-alt {
        transform: scale(var(--ggs,1))
    }
    .gg-spinner-alt,
    .gg-spinner-alt::before {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px
    }
    .gg-spinner-alt::before {
        content: "";
        position: absolute;
        border-radius: 100px;
        animation: spinneralt 1s cubic-bezier(.6,0,.4,1) infinite;
        border: 4px solid transparent;
        border-top-color: var(--bright);
    }
</style>