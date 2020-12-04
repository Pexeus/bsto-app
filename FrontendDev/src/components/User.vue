<template>
    <div class="userWrapper">
        <div class="user">
            <h1>Keko</h1>
            <div class="settings">
                <div class="pw s">
                    <h2>Passwort ändern</h2>
                    <input id="oldPW" type="text" placeholder="Aktuelles Passwort">
                    <div class="new">
                        <input id="newPw" type="password" placeholder="Neues Passwort">
                        <input id="newPwConfirm" type="password" placeholder="Neues Passwort bestätigen">
                    </div>
                    <button id="changePW">Ändern</button>
                </div>
                <div class="logout s"><button id="logout" @click="logout()">Abmelden</button></div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue'
export default {
    name: "User",
    setup() {
        const user = reactive({data:{name: "", perm: "test"}})


        function logout() {
            let decodedToken = decodeToken(localStorage.jwt)
            localStorage.removeItem("jwt")

            location.reload()
        }

        function decodeToken(token) {
            let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
        

            payload = JSON.parse(Buffer.from(payload, 'base64').toString())
            return payload
        }
        return {logout, decodeToken}
    }
}
</script>

<style scoped>
.userWrapper {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 200;
    text-align: center;
}
.user {
    background: var(--dark);
    padding: 50px;
    display: inline-block;
    margin-top: 20vh;
}
.settings button {
    background: var(--mid);
    border: 1px solid var(--shadow);
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
}
.user h1 {
    width:100%;
    text-align: left;
}
.settings input {
    border-radius: 5px;
    background: var(--brightdark);
    border:0;
    width: calc(100%-4vh);
    padding: 10px;
    margin: 5px;
}
.new {
    margin-top: 10px;
}
#changePW {
    justify-content: flex-end;
    display: inline-block;
    margin: 5px;
}
.s {
    display:inline-block;
    width:50%;
    text-align: center;
}
</style>