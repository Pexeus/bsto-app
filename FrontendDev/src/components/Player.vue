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
        </div>
        <div class="info">

        </div>
        <div class="episodes"></div>
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

            player.source = source
        }

        function getTrailer(show) {
            const code = show.info.trailer.split("https://www.youtube.com/watch?v=")[1]
            
            return "`https://www.youtube.com/embed/${code}?autoplay=1`"
        }

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
            }
            if (mode == "active") {
                loader.classList.remove("loaderVisible")
                player.classList.add("playerVisible")
            }
        }

        async function getShow(id) {
            const token = localStorage.jwt
            const user = decodeToken(token)

            const response = await fetch(api + `episodes/${props.showID.value}?UID=${user.id}`)
            const show = await response.json()

            return show
        }

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