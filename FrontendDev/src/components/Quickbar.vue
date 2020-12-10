<template>
    <div class="quickbarWrapper">
        <div class="swipeWrapper left" @click="swipe()"><i class="gg-chevron-left"></i></div>
        <div class="swipeWrapper right" @click="swipe()"><i class="gg-chevron-right"></i></div>
        <div class="quickbar">
            <div class="show" v-for="show in data.shows" :key="show">
                <div class="imgWrapper" :id="show.ID" @click="openShow()">
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
            <div class="progressBar">
                <div class="progress" :style="{width: show.progress + `%`}"></div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { createRenderer, reactive, watch } from 'vue'
import {api} from "../config"

export default {
    name: "Quickbar",
    props:{
        update: Object,
    },

    setup(props, context) {
        const data = reactive({shows: []})

        watch(() => props.update.value, async () => {
            console.log("Quickbar is updating")
            initQuickbar()
        })
        
        setTimeout(() => {
            document.getElementsByClassName("quickbar")[0].classList.remove("quickbarVisible")
            document.getElementsByClassName("quickbar")[0].classList.add("quickbarHidden")
        },10)

        async function initQuickbar() {
            //getting user data
            const token = localStorage.jwt
            const user = decodeToken(token)

            //resetting current data
            data.shows = []

            //fetching shows
            const responseLatest = await fetch(api + `shows/latest/${user.id}`)
            let showsLatest = await responseLatest.json()
            showsLatest = showsLatest.slice(0, 4)

            for (let show of showsLatest) {
                const response = await fetch(api + `episodes/${show.ID}?UID=${user.id}`)
                const showData = await response.json()

                let currentEpisode = getCurrentEpisode(showData.seasons)
                show.current = currentEpisode

                const progress = getCompletion(showData.seasons)
                show.progress = progress
                
                data.shows.push(show)
            }

            context.emit("contentloaded",true)

            document.getElementsByClassName("quickbar")[0].classList.remove("quickbarHidden")
            document.getElementsByClassName("quickbar")[0].classList.add("quickbarVisible")
            
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

            return (Math.round(watched / episodes * 100))
        } 

        function getCurrentEpisode(seasons) {
            if (seasons.length == 0) {
                return [] 
            }
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

        function swipe() {
            let target = event.target

            while(target.tagName != "DIV") {
                target = target.parentElement
            }

            console.log(target)

            const showContainer = target.parentElement.childNodes[2]

            let scrollValue = 0

            const checkString = target.classList.toString()

            if (checkString.includes("left")) {
                scrollValue = showContainer.scrollLeft - showContainer.offsetWidth
            }
            else {
                scrollValue = showContainer.scrollLeft + showContainer.offsetWidth
            }

            const options = {
                top: 0,
                left: scrollValue,
                behavior: 'smooth'
            }

            showContainer.scroll(options);
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

            fetch(api + "shows/latest/add", fetchOptions).then(resp => {
                //error handling?
            })
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }

        initQuickbar()
        return {data, openShow, swipe}
    }
}
</script>

<style scoped>
    .quickbarWrapper {
        width: 100%;
    }

    .quickbar {
        display: flex;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        position: relative;
        height: 35vh;
    }

    .swipeWrapper {
        position: absolute;
        text-align: center;
        cursor: pointer;
        background-color: var(--shadow);
        width: 30px;
        height: 33vh;
        margin-top: 10px;
        opacity: .7;
        z-index: 1;
        vertical-align: middle;
        text-align: center;
    }

    .swipeWrapper i {
        margin-top: calc(14vh - 11px);
        display: inline-block;
        transform: scale(1.2);
    }

    .swipeWrapper:hover {
        opacity: .9;
        width: 40px;
    }

    .quickbarWrapper .right {
        right: 0px;
    }

    .quickbarWrapper .left {
        left: 0px;
    }

    .quickbarVisible {
        visibility: visible;
        transform: scale(1);
        opacity: 1;
    }

    .quickbarHidden {
        visibility: hidden;
        transform: scale(.9);
        opacity: 0.2;
    }

    .show {
        height: 33vh;
        background-color: var(--mid);
        display: inline-block;
        border-radius: 5px;
        margin: 10px;
        box-shadow: 0px 0px 10px var(--shadow);
        position: relative;
        flex: none;
        max-width: calc(100% - 20px);
    }

    .imgWrapper {
        display: inline-block;
        height: 100%;
        position: relative;
        overflow-x: hidden;
        z-index: 10;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        overflow: hidden;
    }

    .show img {
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
        display: inline-block;
        z-index: 0;
    }

    .imgWrapper:hover img{
        transform: scale(1.05);
        filter: brightness(.7);
    }

    .imgWrapper:hover .continue {
        visibility: visible;
        transform: scale(1);
        opacity: 1;
    }

    .overview {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        max-width: calc(50% - 10px);
        position: relative;
        padding: 5px;
        overflow-y: scroll;
    }

    .status {
        background:var(--brightmid);
        text-align: left;
        vertical-align: middle;
        cursor: pointer;
        position: relative;
        padding: 10px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 3px var(--shadow);
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .status:hover {
        box-shadow: 0px 2px 6px var(--shadow);
    }

    .currentEpisode {
        font-weight: bold;
    }

    .completion {
        color: var(--bright);
        display: inline-block;
        text-align: center;
        margin-bottom: 10px;
    }

    .completion p {
        display: inline-block;
        font-size: 15pt;
        text-align: center;
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
        visibility: hidden;
        transform: scale(.8);
        opacity: 0;
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

    .progressBar {
        width: 100%;
        background-color: var(--lightbright);
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        clip-path: inset(0 0 0 0 round 0px 0px 5px 0px);
        z-index: 15;
    }

    .progress {
        background-color: var(--bright);
        font-size: small;
        font-weight: bold;
        padding-top: 3px;
        padding-bottom: 3px;
        border-bottom-left-radius: 5px;
        padding-left: 2px;
    }
</style>