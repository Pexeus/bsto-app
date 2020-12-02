<template>
    <div class="playerContainer" @click="closePlayer()">
        <div class="player">
            {{data}}
            <div class="left">
                <div class="media">
                    <iframe id="mediaFrame" :src="player.source" allowfullscreen frameborder="0" scrolling="no" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
                </div>
                <div class="info" v-if="data.show.info != undefined">
                    <h1 class="showTitle">{{data.show.info.title}}</h1>
                    <div class="year">
                        <p>{{data.show.info.fromYear}}</p><p v-if="data.show.info.toYear != 0">- {{data.show.info.toYear}}</p>
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
                        <div class="episode" v-for="episode in season.episodes" :key="episode" @click="setMediaSource(episode.vivo_link)">
                            <p>{{episode.title}}</p>
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
            const response = await fetch(host + `episodes/${props.showID.value}`)
            const show = await response.json()

            console.log(props.showID.value);

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
            console.log(data.show);

            seasonNr.value = 0

            const iframe = document.getElementById("mediaFrame")
            iframe.addEventListener("load", () => {
                const width = event.target.offsetWidth

                event.target.style.height = width * 0.56 + "px"

                const infos = document.getElementsByClassName("info")[0]
                console.log(infos);

                infos.style.height = document.getElementsByClassName("player")[0].offsetHeight - width * 0.56 -60 + "px"
            })

            document.getElementsByClassName("playerContainer")[0].style.display = "block"
        })

        function setMediaSource(url) {
            const vivoCode = url.split("https://vivo.sx/")[1]
            player.source = "https://vivo.sx/embed/" + vivoCode
        }

        function closePlayer() {
            if (event.target.className == "playerContainer") {
                data.show = {}

                document.getElementsByClassName("playerContainer")[0].style.display = "none"
                player.source = ""
            }
        }

        return {data, seasonNr, player, setMediaSource, closePlayer}
    },
    mounted(){

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
        display: none;
    }

    .player {
        padding: 30px;
        background-color: var(--mid);
        display: inline-block;
        border-radius: 5px;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 5vh;
        margin-bottom: 5vh;
        height: calc(100vh - 10vh);
        text-align: left;
        border-radius: 5px;
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

    .info {
        overflow-y: scroll;
        vertical-align: top;
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

    .episodes {
        display: inline-block;
        width: 50%;
        height: 100%;
        vertical-align: top;
        overflow-y: scroll;
    }

    .season h2{
        padding: 10px;
        padding-top: 40px;
    }

    .episode {
        width: calc(100% - 30px);
        padding: 10px;
        margin: 5px;
        font-size: large;
        box-shadow: 0px 0px 2px var(--shadow);
        cursor: pointer;
        border-radius: 5px;
    }

    .episode:hover {
        background-color:  var(--bright);
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
</style>