<template>
    <div class="genres">
        <div class="genre" v-for="genre in shows.genres" :key="genre.length">
            <h2 class="genreName">{{genre.title}}</h2>
            <p class="swipeRight" @click="swipe">></p>
            <p class="swipeLeft"  @click="swipe">&lt;</p>
            <div class="showWrapper">
            <div class="show" v-for="show in genre" :key="show.length" @click="openShow()" :id=show.SID>
                <img :src="show.cover" :alt="show.title">
                <div class="overview">
                    <p class="showTitle">{{show.title}}</p>
                    <div class="showTag" v-for="tag in show.genres" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    name: "Genres",

    setup(props, context) {
        const host = "http://bstoapp.staging.it-tf.ch/api/"
        const shows = reactive({genres: {}})
        const showID = reactive({value: "ddd"})

        async function loadShows() {
            var genres = await fetch(host + "genres")
            genres = await genres.json()

            for (let i = 0; i < genres.length; i++) {
                let genre = genres[i]

                let response = await fetch(host + `shows/genre/${genre}`)
                shows.genres[genre] = await response.json()
                shows.genres[genre].title = genre
            }
        }

        function openShow() {
            let target = event.target

            while (target.id == "") {
                target = target.parentElement
            }

            context.emit('newshow', target.id)
        }

        loadShows()
        return {shows, showID, openShow}
    },

    methods: {
        swipe(event) {
            const showContainer = event.target.parentElement.childNodes[3]
            const target = event.target

            let scrollValue = 0

            if (target.innerHTML == "&lt;") {
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
        },
    },
}
</script>

<style scoped>
    .genres {
        width: 100%;
        min-height: 100vh;
        padding-top: 20px;
    }

    h2 {
        padding-top: 15px;
        padding-left: 5px;
        position: relative;
        font-weight: 400;
    }

    .genre {
        position: relative;
    }

    .swipeRight {
        position: absolute;
        right: 0px;
        text-align: center;
        font-size: 20pt;
        cursor: pointer;
        background-color: var(--shadow);
        width: 30px;
        height: 28vh;
        margin-top: 17px;
        opacity: .7;
        z-index: 1;
        line-height: 28vh;
        vertical-align: middle;
    }

    .swipeRight:hover {
        opacity: .9;
        width: 40px;
    }

    .swipeLeft {
        position: absolute;
        left: 0px;
        text-align: center;
        font-size: 20pt;
        cursor: pointer;
        background-color: var(--shadow);
        width: 30px;
        height: 28vh;
        margin-top: 17px;
        opacity: .7;
        z-index: 1;
        line-height: 28vh;
        vertical-align: middle;
    }

    .swipeLeft:hover {
        opacity: .9;
        width: 40px;
    }

    .showWrapper {
        width: 100%;
        overflow-x: scroll;
        display: flex;
        padding: 10px;
        padding-top: 17px;
        padding-bottom: 17px;
        position: relative;
    }

    .showWrapper::-webkit-scrollbar {
        display: none;
    }

    .show {
        height: 28vh;
        border-radius: 5px;
        margin-left: 6px;
        margin-right: 6px;
        box-shadow: 0px 3px 10px var(--shadow);
        cursor: pointer;
        position: relative;
    }

    .overview {
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: var(--mid);
        padding: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        opacity: 0;
    }

    .showTitle {
        font-size: large;
        padding: 3px;
        margin-bottom: 20px;
    }

    .showTag {
        background-color: var(--bright);
        border-radius: 12px;
        display: inline-block;
        margin: 3px;
        font-size: small;
        font-weight: bold;
        padding: 3px;
        padding-left: 6px;
        padding-right: 6px;
    }

    .show:hover {
        transform: scale(1.06);
        position: absolutes;
        box-shadow: 0px 0px 10px var(--shadow);
    }

    .show:hover img {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .show:hover .overview {
        opacity: 1;
    }

    img {
        display: inline-block;
        height: 100%;
        border-radius: 5px;
    }
</style>