<template>
    <div class="search">
        <div class="searchbar">
            <div class="inputWrapper">
                <div v-if="data.status == `loading`" class="iconWrapper">
                    <i class="gg-spinner"></i>
                </div>
                <div v-if="data.status == `idle`" class="searchButton">
                    <i @click="requestResults()" class="gg-search"></i>
                </div>
                <input type="text" class="SearchInput" @keydown="requestResults()" id="queryInput" placeholder="Suche...">
            </div>
        </div>
        <div class="results">
            <div class="show" v-for="show in data.results" :key="show.length" @click="openShow()" :id=show.ID>
                <img :src="show.cover" :alt="show.title"  onerror="this.onerror=null;this.src='https://i.ibb.co/jbJ4YYt/noposter.jpg';">
                <div class="overview">
                    <p class="showTitle">{{show.title}}</p>
                    <div class="showTag" v-for="tag in show.genres" :key="tag">
                        <p>{{tag}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import {api} from "../config"

export default {
    name: "Search",

    setup(props, context) {
        const data = reactive({results: [], status: "idle"})

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function requestResults() {
            await sleep(100)

            //activating loader
            data.status = "loading"

            const query = document.getElementById("queryInput").value.toLowerCase()

            console.log(query);

            if (query != "") {
                const response = await fetch(api + `search/${query}`)
                const results = await response.json()

                console.log(results);

                if (document.getElementById("queryInput").value.toLowerCase() == results.query) {
                    data.results = results.results
                }
            }
            else {
                data.results = []
            }

            data.status = "idle"
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

            fetch(api + "shows/latest/add", fetchOptions).then(resp => {
                console.log(resp);
            })
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }

        return {requestResults, data, openShow}
    }
}
</script>

<style scoped>
    .searchbar {
        width: 100%;
        text-align: center;
        padding-top: 5vh;
        padding-bottom: calc(5vh + 50px);
    }

    @media only screen and (max-width: 800px) {
        .searchbar {
            padding-top: 50px;
            padding-bottom: 50px;
        }
    }

    .inputWrapper {
        display: inline-block;
        position: relative;
        width: 500px;
        max-width: 90%;
    }

    .inputWrapper .iconWrapper {
        position: absolute;
        right: 0;
        padding: 12.5px;
    }

    .gg-spinner {
        transform: scale(1.1);
    }

    .searchButton {
        position: absolute;
        right: 0;
        border-radius: 5px;
        height: 43px;
        width: 43px;
        margin-top: 1px;
        padding: 10px;
        text-align: center;
        cursor: pointer;
    }

    .searchButton:hover {
        background-color: var(--brightLight);
    }

    .gg-search {
        margin-top: 2px;
        display: inline-block;
    }

    input {
        background-color: var(--mid);
        border: 1px solid var(--shadow);
        font-size: larger;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        width: 100%;
        box-shadow: 0px 1px 5px var(--shadow);
    }

    input:focus {
        box-shadow: 0px 3px 10px var(--shadow);
    }

    .results {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
    }

    .show {
        height: 28vh;
        border-radius: 5px;
        margin: 10px;
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