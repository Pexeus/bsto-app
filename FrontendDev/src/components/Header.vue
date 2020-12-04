<template>
    <div class="header">
        <div class="goTo">
            <p class="selector selectorText">Meine Auswahl</p>
            <p class="selector selectorText">Suche</p>
            <div class="selector genresOpen">
                <p class="selectorText">Genres</p>
                <div class="genresDropdown" v-if="headerData.genres != undefined">
                    <div class="dropdownPointer"></div>
                    <h3>Alle Genres</h3>
                    <p v-for="genre in headerData.genres" :key="genre" @click="goToGenre(genre)">{{genre}}</p>
                </div>
            </div>
        </div>
        <div class="userMenu">
            <p><i @click="openUser()" class="gg-profile"></i></p>
            <p @click="logOut()">Logout</p>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    name: "Header",

    setup(props, context) {
        const host = "http://bstoapp.staging.it-tf.ch/api/"
        const headerData = reactive({genres: []})

        document.addEventListener("scroll", ()=> {
            const header = document.getElementsByClassName("header")[0]

            if (window.pageYOffset > 0) {
                header.classList.add("headerFloat")
            }
            else {
                header.classList.remove("headerFloat")
            }
        })

        function goToGenre(genre) {
            const target = document.getElementById("genre_" + genre)

            target.scrollIntoView({block: 'center', inline: 'center', behavior: "smooth"});
            
            //evtl so epis
            //target.style.color = "var(--bright)"
        }

        async function loadGenres() {
            var genres = await fetch(host + "genres")
            genres = await genres.json()


            headerData.genres = genres
            console.log(headerData);
        }

        function logOut() {
            let decodedToken = decodeToken(localStorage.jwt)
            console.log(decodedToken);
            localStorage.removeItem("jwt")
            

            location.reload()
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
            console.log(payload);

            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            console.log(payload);
            return payload
        }

        function openUser() {
            console.log("opening user")
            context.emit("showuserpage",{test: true})
        }

        loadGenres()

        return {logOut, openUser, headerData, goToGenre}
    }
}
</script>

<style scoped>
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
        max-width: 50%;
        width: 400px;
        margin-left: 20px;
    }

    .goTo .selector {
        display: inline-block;
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

    .genresOpen:hover .genresDropdown {
        visibility: visible;
        opacity: 1;
        transform: scale(1);
        margin-top: 0px;
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
        margin-left: -230px;
        margin-top: -50px;
        visibility: hidden;
        opacity: 0;
        border-bottom: 8px solid var(--bright);
        transform: scale(.7);
        transition: all ease-in-out .2s;
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
        margin-top: 6px;
        margin-bottom: 6px;
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
        width: 300px;
        justify-content: flex-end;
    }

    .userMenu p {
        display: inline-block;
        margin-right: 25px;
        opacity: .8;
        cursor: pointer;
        font-weight: bold;
    }

</style>