<template>
    <div class="header">
        <div class="goTo">
            <img src="../assets/logo.png" alt="logo" id="logo">
            <p class="selector selectorText" @click="scrollTo(`selection`)">Meine Auswahl</p>
            <p class="selector selectorText" @click="scrollTo(`search`)">Suche</p>
            <div class="selector genresOpen">
                <p class="selectorTextForced selectorText">Genres</p>
                <div class="genresDropdown" v-if="headerData.genres != undefined">
                    <div class="dropdownPointer"></div>
                    <h3>Alle Genres</h3>
                    <p v-for="genre in headerData.genres" :key="genre" @click="goToGenre(genre)">{{genre}}</p>
                </div>
            </div>
        </div>
        <div class="userMenu">
            <div @click="showUserPage()" class="showUser">
                <i class="gg-profile"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import {api} from "../config"
export default {
    name: "Header",

    setup(props, context) {
        const headerData = reactive({genres: [], user: {}})

        document.addEventListener("scroll", ()=> {
            const header = document.getElementsByClassName("header")[0]

            if (window.pageYOffset > 0) {
                header.classList.add("headerFloat")
            }
            else {
                header.classList.remove("headerFloat")
            }
        })

        function scrollTo(classList) {
            const target = document.getElementsByClassName(classList)[0]
            target.scrollIntoView({behavior: "smooth", block: "center"});
        }

        function scrollTop() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        function goToGenre(genre) {
            const target = document.getElementById("genre_" + genre)

            target.scrollIntoView({behavior: "smooth"});
            
            //evtl so epis
            //target.style.color = "var(--bright)"
        }

        async function loadGenres() {
            var genres = await fetch(api + "genres")
            genres = await genres.json()


            headerData.genres = genres
        }

        function loadUserData() {

        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            console.log(payload);

            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            console.log(payload);
            return payload
        }

        function showUserPage() {
            context.emit("userpageactive", {status:true})
        }
        loadGenres()
        loadUserData()
        return { showUserPage, headerData, goToGenre, scrollTop, scrollTo}
    }
}
</script>

<style scoped>
    #logo {
        height: 35px;
        margin-right: 2vh;
        -webkit-filter: drop-shadow(0px 1px 3px rgb(10, 10, 10));
        filter: drop-shadow(0px 1px 3px rgb(10, 10, 10));
    }
    .header {
        width: 100%;
        height: 50px;
        background-color: var(--dark);
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
    }

    .headerFloat {
        box-shadow: 0px 3px 10px var(--shadow);
    }

    .goTo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        max-width: calc(100% - 60px);
        margin-left: 20px;
    }

    .goTo .selector {
        flex-grow: 1;
        cursor: pointer;
        font-weight: bold;
        height: 100%;
    }

    .goTo .selectorText {
        line-height: 50px;
        opacity: .8;
    }

    .goTo .selectorText:hover {
        opacity: 1;
    }

    @media only screen and (min-width: 800px) {
        .selectorText {
            display: inline-block;
        }
    }

    @media only screen and (max-width: 800px) {
        .selectorText {
            display: none;
        }
        .selectorTextForced {
            display: inline-block;
        }
    }

    .genresOpen:hover .genresDropdown {
        visibility: visible;
        opacity: 1;
        transform: scale(1);
        margin-top: 50px;
    }

    .genresDropdown {
        position: absolute;
        display: inline-block;
        background-color: var(--mid);
        padding: 20px;
        border-radius: 5px;
        margin: 5px;
        box-shadow: 0px 0px 15px var(--shadow);
        cursor: default;
        width: 500px;
        text-align: center;
        margin-left: -280px;
        margin-top: -50px;
        visibility: hidden;
        opacity: 0;
        border-bottom: 8px solid var(--bright);
        transform: scale(.7);
        transition: all ease-in-out .2s;
    }

    @media only screen and (max-width: 800px) {
        .genresDropdown {
            position: absolute;
            display: inline-block;
            background-color: var(--mid);
            padding: 20px;
            border-radius: 5px;
            margin: 5px;
            box-shadow: 0px 0px 15px var(--shadow);
            cursor: default;
            width: calc(100% - 10px);
            text-align: center;
            margin-top: -50px;
            visibility: hidden;
            opacity: 0;
            border-bottom: 8px solid var(--bright);
            transform: scale(.7);
            transition: all ease-in-out .2s;
            left: 0;
        }

        .dropdownPointer {
        background-color: var(--mid);
        width: 10px;
        height: 10px;
        display: inline-block;
        position: absolute;
        top: -5px;
        left: calc(50% - 60px);
        transform: rotate(45deg);
    }
    }

    .dropdownPointer {
        background-color: var(--mid);
        width: 10px;
        height: 10px;
        display: inline-block;
        position: absolute;
        top: -5px;
        transform: rotate(45deg);
    }

    .genresDropdown h3 {
        margin-bottom: 20px;
        text-align: left;
    }

    .genresDropdown p {
        font-weight: 400;
        display: inline-block;
        width: 33%;
        margin-top: 4px;
        margin-bottom: 4px;
        text-align: left;
        opacity: .8;
        font-size: large;
        cursor: pointer;
    }

    .genresDropdown p:hover {
        opacity: 1;
        color: var(--bright);
    }

    .userMenu {
        display: flex;
        max-width: 50%;
        width: 150px;
        justify-content: flex-end;
        align-items: center;
    }

    .showUser {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 100%;
        padding: 10px;
    }

    .showUser:hover {
        background-color: var(--mid);
    }

    .showUser i {
        margin-left: 5px;
        margin-right: 5px;
        transform: scale(1.2);
    }
</style>