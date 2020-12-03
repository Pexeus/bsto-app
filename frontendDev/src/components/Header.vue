<template>
    <div class="header">
        <div class="goTo">
            <p>Meine Auswahl</p>
            <p>Suche</p>
            <p>Genres</p>
        </div>
        <div class="userMenu">
            <p>Profile</p>
            <p @click="logOut()">Logout</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",

    setup() {
        document.addEventListener("scroll", ()=> {
            const header = document.getElementsByClassName("header")[0]

            if (window.pageYOffset > 0) {
                header.classList.add("headerFloat")
            }
            else {
                header.classList.remove("headerFloat")
            }
        })

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

        return {logOut}
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

    .goTo p {
        display: inline-block;
        flex-grow: 1;
        opacity: .8;
        cursor: pointer;
        font-weight: bold;
    }

    .header p:hover {
        opacity: 1;
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