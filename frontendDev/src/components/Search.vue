<template>
    <div class="search">
        <div class="searchbar">
            <input type="text" class="SearchInput" @keydown="requestResults()" id="queryInput" placeholder="Suche...">
        </div>
        <div class="results">
            <div class="show" v-for="show in data.results" :key="show.length" @click="openShow()" :id=show.ID>
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
</template>

<script>
import { reactive } from 'vue'

export default {
    name: "Search",

    setup(props, context) {
        const host = "http://bstoapp.staging.it-tf.ch/api/"
        const data = reactive({results: []})

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function requestResults() {
            await sleep(100)

            const query = document.getElementById("queryInput").value

            if (query != "") {
                const response = await fetch(host + `search/${query}`)
                const results = await response.json()

                if (document.getElementById("queryInput").value == results.query) {
                    data.results = results.results
                }
            }
            else {
                data.results = []
            }
        }

        function openShow() {
            let target = event.target

            while (target.id == "") {
                target = target.parentElement
            }

            context.emit('newshow', target.id)
        }

        return {requestResults, data, openShow}
    }
}
</script>

<style scoped>
    .searchbar {
        width: 100%;
        text-align: center;
        padding: 50px;
    }

    input {
        background-color: var(--mid);
        border: 1px solid var(--shadow);
        font-size: larger;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        width: 500px;
        max-width: calc(100% - 100px);
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