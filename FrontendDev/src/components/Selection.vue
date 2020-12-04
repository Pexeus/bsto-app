<template>
    <div class="selection">
        <div class="selectionWatched" v-if="data.watched.length != 0">
            <h2>Kürzlich angesehen</h2>
            <div class="swipeWrapper left" @click="swipe"><i class="gg-chevron-left"></i></div>
            <div class="swipeWrapper right" @click="swipe"><i class="gg-chevron-right"></i></div>
            <div class="showWrapper">
                <div class="show" v-for="show in data.watched" :key="show.ID" :id=show.ID @click="openShow()">
                    <img :src="show.cover" :alt="show.title"  onerror="this.onerror=null;this.src='../assets/noposter.jpg';">
                    <div class="overview">
                    <p class="showTitle">{{show.title}}</p>
                    <div class="showTag" v-for="tag in show.genres" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="selectionList" v-if="data.list.length != 0">
            <h2>Meine Liste</h2>
            <div class="swipeWrapper left" @click="swipe"><i class="gg-chevron-left"></i></div>
            <div class="swipeWrapper right" @click="swipe"><i class="gg-chevron-right"></i></div>
            <div class="showWrapper">
                <div class="show" v-for="show in data.list" :key="show.ID" :id=show.ID @click="openShow()">
                    <img :src="show.cover" :alt="show.title"  onerror="this.onerror=null;this.src='../assets/noposter.jpg';">
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
    name: "Selection",

    setup(props, context) {
        const data = reactive({watched: [], list: []})

        const host = "http://bstoapp.staging.it-tf.ch/api/"

        async function initSelection() {

            const token = localStorage.jwt
            const user = decodeToken(token)

            const responseLatest = await fetch(host + `shows/latest/${user.id}`)
            const showsLatest = await responseLatest.json()
            data.watched = showsLatest

            const responseList = await fetch(host + `shows/list/${user.id}`)
            const showsList = await responseList.json()
            data.list = showsList

            console.log(data);
        }

        function openShow() {
            let target = event.target

            while (target.id == "") {
                target = target.parentElement
            }

            addLatest(target.id)
            console.log(target.id);
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
                console.log(resp);
            })
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }


        initSelection()

        return {data, openShow}
    },
    methods: {
        swipe(event) {
            const showContainer = event.target.parentElement.childNodes[3]
            const target = event.target

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
        },
    },
}
</script>

<style scoped>
     h2 {
        padding-top: 15px;
        padding-left: 5px;
        position: relative;
        font-weight: 400;
    }

    .swipeWrapper {
        position: absolute;
        text-align: center;
        cursor: pointer;
        background-color: var(--shadow);
        width: 30px;
        height: 28vh;
        margin-top: 17px;
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

    .selection .right {
        right: 0px;
    }

    .selection .left {
        left: 0px;
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
        display: inline-block;
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