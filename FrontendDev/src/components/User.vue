<template>
    <div id="wrapper" class="userWrapper" @click="closeComponent()">
        <div class="user">
            <h1>{{user.data.name}}</h1>
            <div class="stats">
                <h3>Statistiken</h3>
                <div class="showsSeen">
                    <h2>{{user.data.stats.shseen}}</h2>
                    <p>Serien angesehen</p>
                </div>
                <div class="episodesSeen">
                    <h2>{{user.data.stats.epseen}}</h2>
                    <p>Episoden angesehen</p>
                </div>
                <div class="favgenre">
                    <h2>'{{user.data.stats.genre}}'</h2>
                    <p>Lieblingsgenre</p>
                </div>
            </div>
            <div class="settings">
                <div class="pw s">
                    <h2>Passwort ändern</h2>
                    <input id="oldPw" type="password" placeholder="Aktuelles Passwort...">
                    <div class="new">
                        <input id="newPw" type="password" placeholder="Neues Passwort...">
                        <input id="newPwConfirm" type="password" placeholder="Neues Passwort bestätigen...">
                    </div>
                    <button id="changePW" @click="changePassword()">Passwort ändern</button>
                </div>
                <div class="logout s" >
                    <div @click="logout()" class="logoutwrapper">
                        <div class="imgwrapper">
                            <i class="gg-log-out"></i>
                        </div>
                        <p class="logouttext">Abmelden</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue'
export default {
    name: "User",
    async setup(props, context) {
        const user = reactive({data:{name: "", perm: "test",stats:{seen:1,genre:""}}})

        const host = "http://bstoapp.staging.it-tf.ch/"
        const api = "http://bstoapp.staging.it-tf.ch/api/"


        let decodedToken = decodeToken(localStorage.jwt)

        user.data.name = decodedToken.name
        user.data.id = decodedToken.id

        let showsseen = await getShowsSeen(user.data.id)
        let episodesseen = await getEpisodesSeen(user.data.id)

        user.data.stats.shseen = showsseen.count
        user.data.stats.epseen = episodesseen.count
        user.data.stats.genre = await getFavGenre(user.data.id)

        document.querySelector("body").style.overflowY = "hidden"

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
        function closeComponent() {
            if(event.target.id == "wrapper") {
                context.emit("userpageclosed", {status:false})

                document.getElementById("oldPw").value =  ""
                document.getElementById("newPw").value =  ""
                document.getElementById("newPwConfirm").value =  ""

                document.querySelector("body").style.overflowY = "scroll"
            }
        
        }
        async function getShowsSeen(uid) {
            let resp = await fetch(api+`shows/seen/${uid}`)
            let result = await resp.json()

            return result
        }
        async function getEpisodesSeen(uid) {
            let resp = await fetch(api+`episodes/seen/${uid}`)
            let result = await resp.json()

            return result
        }
        async function getFavGenre(uid) {
            let resp = await fetch(api + `genres/fav/${uid}`)
            let result = await resp.json()

            return result.fav
        }
        async function changePassword() {
            let obj = {
                uid: decodedToken.id,
                old: document.getElementById("oldPw").value,
                new: document.getElementById("newPw").value,
                conf: document.getElementById("newPwConfirm").value
            }

            document.getElementById("oldPw").value =  ""
            document.getElementById("newPw").value =  ""
            document.getElementById("newPwConfirm").value =  ""

            if(obj.old == "" || obj.new == "" || obj.conf == "") {
                alert("Bitte alle Werte einfügen")
            }
            else {
                let opt = {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(obj)
                }

                //console.log(opt);

                let resp = await fetch(host + "changePassword", opt)
                let json = await resp.json()
                
                // current password wrong
                if(json.old == false) {
                    alert("Aktuelles Passwort nicht korrekt")
                }
                // new passwords not matching
                else if(json.confirm == false) {
                    alert("Neue Passwörter stimmen nicht überein")
                }
                // error while inserting into DB
                else if(json.changed == 0) {
                    alert("Fehler beim ersetzen des Passworts")
                }
                else if (json.old == true && json.confirm == true && json.changed == 1) {
                    document.querySelector("body").style.overflowY = "scroll"
                    context.emit("userpageclosed", {status:false})
                }
            }
        }
        return {logout, decodeToken, user, changePassword, closeComponent}
    }
}
</script>

<style scoped>
.userWrapper {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.658);
    z-index: 200;
    text-align: center;
}
.user {
    background: var(--dark);
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 80px;
    padding-top: 60px;
    display: inline-block;
    margin-top: 20vh;
    box-shadow: 0px 3px 10px rgb(5, 5, 5);
    border-radius: 5px;
}
.stats {
    display: block;
}
.stats div {
    display: inline-block;
    margin: 3%;
    margin-top:5%;
    margin-bottom:5%;
}
.stats h2 {
    font-size: 22pt;
    text-align: left;
    color: var(--bright);
}
.stats h3 {
    font-size: 12pt;
    font-weight: 400;
    text-align: left;
}
.stats p {
    text-align: left;
    font-size: 13px;
}
.settings {
    height: 100%;
    position: relative;
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
.settings h2 {
    font-size: 12pt;
    font-weight: 400;
    text-align: left;
}
.settings input {
    border: 1px solid var(--shadow);
    border-radius: 5px;
    background: var(--brightdark);
    float:left;
    width: calc(100%-20px);
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.pw button {
    float:left;
}
#changePW {
    justify-content: flex-end;
    display: inline-block;
    margin: 5px;
    margin-left:0;
}
.s {
    display:inline-block;
    width:50%;
    text-align: center;
}
.logout {
    vertical-align: top;
    padding-top: 30px;
}
.logoutwrapper {
    background:var(--mid);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 8px var(--shadow);
}
.logoutwrapper:hover > p {
    color: var(--bright);
}
.logoutwrapper:hover {
    box-shadow: 0px 5px 10px var(--shadow);
}
.logoutwrapper:hover > div > i {
    color: var(--bright);
}
.logoutwrapper * {
    display: block;
}
.logouttext {
    box-shadow: none;
}
.imgwrapper {
    margin-left: calc(50% - 6px);
    height: 50px;
    margin-top: 10px;
}
.imgwrapper i {
    transform: scale(2);
}

@media only screen and (max-width: 800px) {
    .s {
        width: 100%;
    }
    input {
        width: 100%;
    }
    .user {
        width:100%;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 8vh;
    }
    .settings {
        width:100%;
    }
    .user h2 {
        width: 100%;
    }
    .stats div {
        display: block;
    }
    .stats {
        text-align: center;
    }
    
}
</style>