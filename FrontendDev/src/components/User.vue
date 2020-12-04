<template>
    <div id="wrapper" class="userWrapper" @click="closeComponent()">
        <div class="user">
            <h1>{{user.data.name}}</h1>
            <div class="settings">
                <div class="pw s">
                    <h2>Passwort ändern</h2>
                    <input id="oldPw" type="password" placeholder="Aktuelles Passwort">
                    <div class="new">
                        <input id="newPw" type="password" placeholder="Neues Passwort">
                        <input id="newPwConfirm" type="password" placeholder="Neues Passwort bestätigen">
                    </div>
                    <button id="changePW" @click="changePassword()">Ändern</button>
                </div>
                <div class="logout s" >
                    <div @click="logout()" class="logoutwrapper">
                        <div class="imgwrapper">
                            <i class="gg-log-out"></i>
                        </div>
                        <p>Abmelden</p>
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
    setup(props, context) {
        const user = reactive({data:{name: "", perm: "test"}})
        const host = "http://bstoapp.staging.it-tf.ch/"
        let decodedToken = decodeToken(localStorage.jwt)
        user.data.name = decodedToken.name



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
            }
        
        }
        async function changePassword() {
            let obj = {
                uid: decodedToken.id,
                old: document.getElementById("oldPw").value,
                new: document.getElementById("newPw").value,
                conf: document.getElementById("newPwConfirm").value
            }
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
    background-color: rgba(0,0,0,0.4);
    z-index: 200;
    text-align: center;
}
.user {
    background: var(--dark);
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
    padding-top: 30px;
    display: inline-block;
    margin-top: 20vh;
    box-shadow: 0px 3px 10px rgb(14, 14, 14);
    border-radius: 5px;
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
.user h2 {
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
}
.s {
    display:inline-block;
    width:50%;
    text-align: center;
}
.logout {
    vertical-align: top;
    padding-top: 50px;
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
}
.logoutwrapper:hover > p {
    color: var(--bright);
}
.logoutwrapper:hover > div > i {
    color: var(--bright);
}
.logoutwrapper * {
    display: block;
}
.imgwrapper {
    margin-left: calc(50% - 6px);
    height: 50px;
    margin-top: 10px;
}
.imgwrapper i {
    transform: scale(2);
}
</style>