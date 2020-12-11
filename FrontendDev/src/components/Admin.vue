<template>
    <div id="wrapper" class="adminWrapper" @click="closeComponent()">
        <div class="adminloader">
            <p>Lade Admin-panel...</p>
            <i class="gg-spinner-alt"></i>
        </div>
        <div class="admin">
            <h1>Admin panel</h1>
            <div id="nav">
                <p id="nav_list" @click="setNav(true)">Benutzer verwalten</p>
                <p id="nav_create" @click="setNav(false)">Benutzer erstellen</p>
            </div>
            <div v-if="navMode.status" class="list">
                <table class="userTable">
                    <tr class="tr_h">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Perm</th>
                        <th>Aktiv</th>
                        <th>Löschen</th>
                    </tr>
                    <tr class="tr" v-bind:id="'tr'+user.ID" v-for="user of users.data" :key="user.ID">
                        <td>{{user.ID}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.perm}}</td>
                        <td class="active">
                            <div v-bind:id="'al'+user.ID" class="al"><i class="gg-spinner-alt"></i></div>
                            <div v-if="!user.active" @click="setActive(user.ID, user.active)" class="off">
                                <i v-bind:id="user.ID" class="gg-toggle-on"></i>
                            </div>
                            <div v-if="user.active"  @click="setActive(user.ID, user.active)" class="on">
                                <i v-bind:id="user.ID" class="gg-toggle-off"></i>
                            </div>
                        </td>
                        <td class="del" @click="removeUser(user.ID)">
                            <div class="iconwrap">
                                <i class="gg-trash"></i>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="!navMode.status" class="create">
                <h2>Neuen Benutzer erstellen</h2>
                <div class="createLoader">
                    <i class="gg-spinner-alt"></i>
                </div>
                <div class="form">
                    <input id="input_name" type="text" placeholder="Benutzername...">
                    <div class="p">
                        <input type="text" placeholder="Passwort..." id="input_pw"><button @click="generatePW()" class="pwbutton">Passwort generieren</button>
                    </div>
                    <div class="perm">
                        <p id="perm_user" class="activeperm" @click="setPerm('user')">User</p>
                        <p id="perm_admin" @click="setPerm('admin')" >Admin</p>
                    </div>
                    <button @click="createUser()">Erstellen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { host } from "../config"
export default {
    setup(props, context) {
        const navMode = reactive({status:true})
        const users = reactive({data:[]})

        const newUser = reactive({data:{
            perm: "user"
        }})

        function closeComponent() {
            if(event.target.id == "wrapper") {
                context.emit("adminpageclosed", {status:false})

                document.querySelector("html").style.overflowY = "scroll"
            }
        
        }

        function generatePW() {
            var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            var nums = ["1","2","3","4","5","6","7","8","9","0"]
            let len = Math.floor(Math.random() * 10) + 7
            let pw = ""
            for(let x=0;x<len;x++) {
                let arr = Math.floor(Math.random() * 2)
                if(arr == 0) {
                    let index = Math.floor(Math.random() * chars.length)
                    pw += chars[index]
                }
                else if(arr == 1) {
                    let index = Math.floor(Math.random() * nums.length)
                    pw += nums[index]
                }
            }
            document.getElementById("input_pw").value = pw
        }

        function setLoader() {
            
            document.getElementsByClassName("adminloader")[0].style.visibility = "hidden"
            document.getElementsByClassName("admin")[0].style.visibility = "visible"
            document.getElementsByClassName("admin")[0].style.opacity = "1"
            document.getElementsByClassName("admin")[0].style.transform = "scale(1)"
            document.getElementsByClassName("adminloader")[0].style.display = "none"
        }
        function setPerm(perm) {
            newUser.data.perm = perm
            if(perm == "user") {
                document.getElementById("perm_admin").classList.remove("activeperm")
                document.getElementById("perm_user").classList.add("activeperm")
            }
            else if(perm == "admin") {
                console.log(document.getElementById("perm_admin").classList)
                document.getElementById("perm_user").classList.remove("activeperm")
                document.getElementById("perm_admin").classList.add("activeperm")
            }
        }
        function setNav(mode) {
            navMode.status = mode
            checkNav()
        }
        async function getUsers() {
            let opt = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let response = await fetch(host+"users", opt)

            let result = await response.json()

            users.data = result

        }
        function checkNav() {
            if(navMode.status == true) {
                document.getElementById("nav_create").classList.remove("navActive")
                document.getElementById("nav_list").classList.add("navActive")
            }
            else {
                load()
                document.getElementById("nav_list").classList.remove("navActive")
                document.getElementById("nav_create").classList.add("navActive")
            }
        }
        function setActiveLoader(mode, elemID) {
            if(mode) {
                document.getElementById(elemID).style.visibility = "hidden"
                document.getElementById("al"+elemID).style.visibility = "visible"
            }
            else {
                document.getElementById("al"+elemID).style.visibility = "hidden"
                document.getElementById(elemID).style.visibility = "visible"
            }
        }
        function setCreateLoader(mode) {
            if(mode) {
                document.getElementsByClassName("form")[0].style.visibility = "hidden"
                document.getElementsByClassName("createLoader")[0].style.visibility = "visible"
            }
            else {
                document.getElementsByClassName("createLoader")[0].style.visibility = "hidden"
                document.getElementsByClassName("form")[0].style.visibility = "visible"
            }
        }
        async function setActive (userID, state) {
            let obj = {
                uid: userID,
                status: state
            }
            let opt = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }
            setActiveLoader(true, userID)
            let response = await fetch(host + "user/setStatus/", opt)
            let resp = await response.json()
            
            await getUsers()
            setActiveLoader(false,userID)
        }
        async function load() {
            document.querySelector("html").style.overflowY = "none"
            await getUsers()
            setLoader()
            checkNav()
        }

        async function removeUser(id) {
            let confirm = window.confirm("Sicher, dass du den Benutzer löschen willst?")

            if(confirm) {
                let opt = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({uid:id})
                }

                document.getElementById("tr"+id).classList.add("pulse")

                let response = await fetch(host + "user/delete", opt)

                let resp = await response.json()

                document.getElementById("tr"+id).classList.remove("pulse")
                load()
            }
        }

        async function createUser() {
            setCreateLoader(true)
            if(document.getElementById("input_name").value != "" && document.getElementById("input_pw").value != "") {
                newUser.data.name = document.getElementById("input_name").value
                newUser.data.pw = document.getElementById("input_pw").value

                let opt = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser.data)
                }

                let response = await fetch(host + "user/create/", opt)

                let resp = await response.json()

                document.getElementById("input_name").value = ""
                document.getElementById("input_pw").value = ""

                setCreateLoader(false)
                if(resp.error) {
                    alert(`Fehler, ${resp.error}`)
                }
                else {
                    console.log(resp)
                }
            }
            else {
                alert("Bitte alle Felder ausfüllen")
            }

        }

        load()

        return {setNav, closeComponent, navMode, users, setActive, generatePW, createUser, setPerm, newUser, removeUser}
    }
}
</script>

<style scoped>
.pulse {
    -webkit-animation: pulse 1s infinite alternate;
    animation: pulse 1s infinite alternate;
}
@keyframes pulse {
    50% {
        background: var(--lightshadow)
    }
    100% {
        background: var(--shadow)
    }
}
.createLoader {
    visibility: hidden;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.createLoader i {
    padding-top: 3vh;
    padding-bottom: 3vh;
}
.form {
    visibility: visible;
}
.perm {
    display: flex;
    flex-direction: row;
}
.perm p {
    justify-content: center;
    margin: 10px;
    width: 100%;
}
.form {
    display: flex;
    flex-direction: column;
}
.form input {
    background: var(--lightshadow);
    border: 0;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 5px;
    margin-left:0;
    margin-right:0;
    border: 1px solid var(--shadow);
}
.create h2 {
    text-align: left;
}
.form button {
    background: var(--lightshadow);
    padding: 10px;
    border: 1px solid var(--shadow);
    cursor: pointer;
}
.pwbutton {
    margin-left: 5px;
}
.form button:hover {
    background: var(--bright);
}
#nav {
    width: 100%;
    margin-bottom: 30px;
}
#nav p {
    width: 50%;
    text-align: center;
}
h1 {
    text-align: left;
}
.al {
    visibility: hidden;
    transform: scale(0.8);
}
.adminWrapper {
    position: fixed;
    z-index: 10000000;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.658);
    z-index: 200;
    text-align: center;
}
.activeperm {
    color: var(--bright);
}
.admin {
    visibility: hidden;
    display: inline-block;
    background: var(--dark);
    border-radius: 5px;
    padding: 50px;
    margin-top: 30vh;
    transform: scale(0.8);
    opacity: 0.2;
    box-shadow: 0px 3px 10px rgb(5, 5, 5);
}

.adminloader {
    visibility: visible;
    text-align: center;
    margin-top: 35vh;
    background-color: var(--dark);
    padding: 30px;
    width: 20%;
    margin-left:40%;
    border-radius: 5px;
    box-shadow: 0px 1px 3px black;
}
.adminloader p {
    width: 95%;
    padding: 2.5%;
}
.adminloader i {
    color: var(--bright);
    transform: scale(1.5);
    margin-top: 3vh;
    display: inline-block;
    filter: drop-shadow(0px 1px 3px var(--shadow));
}
#nav {
    display: flex;
}
#nav p {
    cursor: pointer;
    justify-content: center;
    margin: 10px;
}
.navActive {
    color: var(--bright);
}
table {
    box-sizing: border-box;
    overflow-y: scroll;
}
table td, table th {
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

.active div {
    grid-column: 1;
    grid-row: 1;
}


.del i:hover {
    color: #ee5253;
}

.tr  {
    background:var(--lightshadow);
}
.tr:hover  {
    background:var(--shadow);
}
table i {
    cursor: pointer;
}

.tr_h {
    background: var(--mid);
    border-bottom: 4px solid var(--bright);
    position: sticky;
    top: 0;
}

.on i {
    color: #10ac84;
}
.off i {
    color: #ee5253;
}
table td, table th {
    text-align: left;
}
.del {
    text-align: center;
}
.del i {
    display: inline-block;
}
.active {
    display: flex;
    align-items: center;
}
.active .al i, .active .on i, .active .off i {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2px;
}

.perm p {
    cursor: pointer;
}
.perm p:hover {
    transform: scale(1.1);
}
</style>