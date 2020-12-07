<template>
    <div class="quickbar">
        <div class="show" v-for="show in data.shows" :key="show">
            <div class="imgWrapper">
                <img :src="show.cover" alt="">
                <div class="continue">
                    <i class="gg-play-button-o"></i>
                </div>
            </div>
            <div class="overview">
                <h2 class="showTitle">{{show.title}}</h2>

                <div class="status">
                    <p class="currentEpisode">{{`Staffel ${show.current.season}, Episode ${show.current.episode}`}}</p>
                    <p class="currentTitle">{{show.current.title}}</p>
                </div>

                <div class="tags">
                     <div class="showTag" v-for="tag in show.genres" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createRenderer, reactive } from 'vue'

export default {
    name: "Quickbar",

    setup(props, context) {
        const data = reactive({shows: []})
        const host = "http://bstoapp.staging.it-tf.ch/api/"

        async function initQuickbar() {
            //getting user data
            const token = localStorage.jwt
            const user = decodeToken(token)

            //fetching shows
            const responseLatest = await fetch(host + `shows/latest/${user.id}`)
            let showsLatest = await responseLatest.json()
            showsLatest = showsLatest.slice(0, 4)

            for (let show of showsLatest) {
                const response = await fetch(host + `episodes/${show.ID}?UID=${user.id}`)
                const showData = await response.json()

                let currentEpisode = getCurrentEpisode(showData.seasons)
                let completion = getCompletion(showData.seasons)
                show.current = currentEpisode
                
                data.shows.push(show)
            }

            console.log(data);
        }

        function getCompletion(seasons) {
            let episodes = 0
            let watched = 0

            for (let season of seasons) {
                for(let episode of season.episodes) {
                    episodes += 1
                    if (episode.watched == true) {
                        watched += 1
                    }
                }
            }

            console.log(watched, episodes);
        } 

        function getCurrentEpisode(seasons) {
            let timestampCheck = 0
            let seasonIndex = 0
            let episodesIndex = 0
            let lastEpisode = {season: 1, episode: 1, title: seasons[0].episodes[0].title}

            for (let season of seasons) {
                seasonIndex += 1
                episodesIndex = 0
                for(let episode of season.episodes) {
                    episodesIndex += 1
                    if (episode.watchedAt > timestampCheck) {
                        lastEpisode = {
                            season: seasonIndex,
                            episode: episodesIndex,
                            title: episode.title
                        }
                    }
                }
            }

            return lastEpisode
        }

        function openShow() {
            let target = event.target

            while (target.id == "") {
                target = target.parentElement
            }

            addLatest(target.id)
            context.emit('newshow', target.id)
        }

        function addLatest(showID) {
            const token = localStorage.jwt
            const user = decodeToken(token)

            let fetchOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({UID: user.id, SID: Number(showID)})
            }

            fetch(host + "shows/latest/add", fetchOptions).then(resp => {
                //error handling?
            })
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }

        initQuickbar()

        return {data, openShow}
    }
}
</script>

<style scoped>
    .show {
        height: 33vh;
        background-color: var(--mid);
        display: inline-block;
        border-radius: 5px;
        margin: 10px;
        box-shadow: 0px 0px 10px var(--shadow);
        position: relative;
    }

    .imgWrapper {
        display: inline-block;
        height: 100%;
        position: relative;
    }

    .show img {
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        filter: brightness(.7);
        cursor: pointer;
    }

    .overview {
        display: inline-block;
        padding: 10px;
        vertical-align: top;
        height: 100%;
        max-width: 250px;
    }

    .status {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: large;
    }

    .currentEpisode {
        font-weight: bold;
    }

    .continue {
        border-radius: 5px;
        font-size: small;
        position: absolute;
        top: calc(50% - 36px);
        left: calc(50% - 36px);
        font-size: large;
        display: flex;
        justify-content: center;
        align-content: center;
        cursor: pointer;
    }

    .continue i {
        margin: 25px;
        transform: scale(2);
    }

    .showTag {
        background-color: var(--bright);
        border-radius: 12px;
        display: inline-block;
        margin: 3px;
        font-weight: bold;
        padding: 3px;
        padding-left: 6px;
        padding-right: 6px;
    }
</style>