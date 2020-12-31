<template>
    <div class="playerContainer" @click="closePlayer()">
        <div class="loader">
            <h3>Lade Episoden...</h3>
            <i class="gg-spinner-alt"></i>
        </div>
        <div class="player">
            <div class="media">
                <iframe class="showFrame" id="mediaFrame" :src="player.source" allowfullscreen frameborder="0" scrolling="no" sandbox="allow-scripts allow-forms allow-same-origin" allow='autoplay'></iframe>
            </div>
            <div class="info">
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
        const player = reactive({source: ""})

        //Initating player
        async function init() {
            toggleMode("load")

            const show = await getShow(props.showID.value)
            data.show = show
            toggleMode("active")

            console.log(show.info.hasWatched);
            console.log(show);

            let source = false

            if (show.info.hasWatched == true) {
                console.log("sorucing");
                source = getLatestEpisode(show)
            }
            else {
                source = getTrailer(show)
            }

            //calculating frame height (16:9 format)
            const frame = document.getElementById("mediaFrame")
            frame.addEventListener("load" , () => {
                const width = event.target.offsetWidth
                event.target.style.height = width * 0.56 + "px"
            })

            player.source = source
        }

        //get embed URL of trailer
        function getTrailer(show) {
            const code = show.info.trailer.split("https://www.youtube.com/watch?v=")[1]
            
            return `https://www.youtube.com/embed/${code}?autoplay=1`
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
        function toggleMode(mode) {
            const container = document.getElementsByClassName("playerContainer")[0]
            const player = document.getElementsByClassName("player")[0]
            const loader = document.getElementsByClassName("loader")[0]

            console.log("setting mode to: " + mode);


            if (mode == "load") {
                container.classList.add("playerContainerVisible")
                loader.classList.add("loaderVisible")
            }
            if (mode == "hidden") {
                container.classList.remove("playerContainerVisible")
                loader.classList.remove("loaderVisible")
                player.classList.remove("playerVisible")
            }
            if (mode == "active") {
                loader.classList.remove("loaderVisible")
                player.classList.add("playerVisible")
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
            if (event.target.className.includes("playerContainerVisible")) {
                toggleMode("hidden")
            }
        }

        //watching for prop changes, initate player on change
        watch(() => props.showID.value, async () => {
            console.clear()
            init()
        })

        return {closePlayer, data, player}
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
        margin-top: 150px;
        box-shadow: 0px 0px 80px black;
    }

    .media {
        width: 100%;
    }

    iframe {
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .info {
        text-align: left;
        padding: 10px;
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