<template>
    <div class="header">
        <div class="goTo">
            <p class="selector">Meine Auswahl</p>
            <p class="selector">Suche</p>
            <div class="selector">
                <p>Genres</p>
                <div class="genresDropdown">
                    <p v-for="genre in headerData.genres" :key="genre">{{genre}}</p>
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

        return {logOut, openUser}
    }
}
</script>

<style scoped>
    .header {
        width: 100%;
        padding: 15px;
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
        max-width: 50%;
        width: 300px;
    }

    .goTo .selector {
        display: inline-block;
        flex-grow: 1;
        cursor: pointer;
        font-weight: bold;
    }

    .genresDropdown {
        position: absolute;
        display: inline-block;
        background-color: var(--mid);
        opacity: 1;
        padding: 10px;
        border-radius: 5px;
        margin: 5px;
        box-shadow: 0px 3px 10px var(--shadow);
        font-weight: 400;
        cursor: default;
        max-height: 300px;
    }

    .genresDropdown p {
        display: inline-block;
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